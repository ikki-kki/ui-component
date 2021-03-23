const API_URL = "https://api.thecatapi.com/v1/breeds/search";

const debounce = (targetFunction, debounceTime = 500) => {
    //가장 마지막 타이핑이 일어나고 0.5초 뒤에 API Request를 실행하도록 하는 debounce logic을 작성하시오.
    //Write Debounce logic here!

};

const LOADING_EVENT_NAME = "loading";
const $searchInput = document.querySelector(".SearchInput");
const $loadingIndicator = document.querySelector(".LoadingIndicator");
const $textList = document.querySelector(".TextList");
const $infoParagraph = document.querySelector(".InfoParagraph");

$searchInput.addEventListener(
    "keyup",
    debounce(async (event) => {
        // Write codes here!
    })
);
