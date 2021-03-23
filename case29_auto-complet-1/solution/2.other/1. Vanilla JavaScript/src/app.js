const API_URL = "https://api.thecatapi.com/v1/breeds/search";

/**
 * `debounce` 함수에 의해 생성된 함수는 반복적으로 호출되더라도 마지막 `debounceTime` 이후에 1회만 실행됩니다.
 * @param {*} targetFunction 
 * @param {*} debounceTime 
 */
const debounce = (targetFunction, debounceTime = 500) => {
    let timeoutId = null;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        /**
         * setTimeout 함수에 인자값으로 콜백 함수, 시간, 콜백 함수의 인자값을 전달할 수 있습니다.
         * @see https://developer.mozilla.org/ko/docs/Web/API/WindowTimers/setTimeout
         */
        timeoutId = setTimeout(targetFunction, debounceTime, ...args);
    }
};

const LOADING_EVENT_NAME = "loading";
const searchInputEl = document.querySelector(".SearchInput");
const loadingIndicatorEl = document.querySelector(".LoadingIndicator");
const textListEl = document.querySelector(".TextList");
const infoParagraphEl = document.querySelector(".InfoParagraph");

searchInputEl.addEventListener("keyup", debounce(async (event) => {
    /**
     * `currntTarget`, `target` 차이를 알아두시면 좋습니다.
     * [>] `currentTarget`은 이벤트가 바인딩된 객체를 가르키고, `target`은 이벤트버블링 발생시 이벤트가 발생한 객체를 가르킵니다.
     * [>] `currentTarget`은 이벤트가 발생하는 순간에만 사용이 가능하며, `debounce`와 같은 비동기 처리함수에서는 `null` 값이 할당됩니다.
     * @see https://developer.mozilla.org/ko/docs/Web/API/Event/target
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
     * @see https://javascript.info/bubbling-and-capturing
     */
    const { value: query } = event.target;
    /**
     * API 요청을 위해 Fetch API 를 사용합니다.
     * @see https://developer.mozilla.org/ko/docs/Web/API/Fetch_API
     */
    const url = API_URL + `?q=` + query;
    try {
        /**
         * 로딩 인디케이터 보임
         */
        loadingIndicatorEl.style.visibility = 'visible';
        const response = await fetch(url);
        const data = await response.json();

        const isEmptyResponseData = data.length === 0;
        /**
         * 검색결과 없는 경우
         */
        infoParagraphEl.textContent = isEmptyResponseData ? '검색 결과가 없습니다.' : '';
        /**
         * 검색결과 있는 경우 목록 엘리먼트 노출
         */
        textListEl.style.visibility = isEmptyResponseData ? 'hidden' : 'visible';
        /**
         * 데이터를 HTML 문자열로 변환
         */
        const itemsHtml = data.map(({ name }) => `<li>${name}</li>`).join('');
        /**
         * 데이터 목록을 화면에 랜더링
         */
        textListEl.innerHTML = itemsHtml;
        /**
         * 로딩 인디케이터 감춤
         */
        loadingIndicatorEl.style.visibility = 'hidden';
    } catch (e) {
        infoParagraphEl.textContent = '처리중 에러가 발생하였습니다!';
    }
}, 500));
