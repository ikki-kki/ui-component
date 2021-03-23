const API_URL = "https://api.thecatapi.com/v1/breeds/search";

const debounce = (targetFunction, debounceTime = 500) => {
    let timerId = null;

    return (...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            targetFunction(...args);
        }, debounceTime);
    };
};

const LOADING_EVENT_NAME = "loading";
const $searchInput = document.querySelector(".SearchInput");
const $loadingIndicator = document.querySelector(".LoadingIndicator");
const $textList = document.querySelector(".TextList");
const $infoParagraph = document.querySelector(".InfoParagraph");

$searchInput.addEventListener(
    "keyup",
    debounce(async (event) => {
        const query = event.target.value;

        if (!query) {
            return;
        }

        document.dispatchEvent(
            new CustomEvent(LOADING_EVENT_NAME, {
                detail: {
                    isLoading: true
                }
            })
        );
        // 고양이 검색 API를 검색어 API로 간주합니다
        const response = await fetch(`${API_URL}?q=${query}`);
        const cats = await response.json();
        document.dispatchEvent(
            new CustomEvent(LOADING_EVENT_NAME, {
                detail: {
                    isLoading: false
                }
            })
        );

        if (!cats.length) {
            $textList.innerHTML = "";
            $textList.style.visibility = "hidden";
            $infoParagraph.innerHTML = "해당하는 검색어가 없습니다..!";
            return;
        }

        $textList.innerHTML = cats
            .slice(0, 5)
            .map((cat) => `<li>${cat.name}</li>`)
            .join("");
        $textList.style.visibility = "visible";
        $infoParagraph.innerHTML = "";
    })
);

document.addEventListener(LOADING_EVENT_NAME, ({
    detail: {
        isLoading
    }
}) => {
    $loadingIndicator.style.visibility = isLoading ? "visible" : "hidden";
});

