## Case29 : AutoComplete 1 - 타 개발자님의 해답

### q1. Vanilla JavaScript

#### A)
```js
// solution/2.others_1/1. Vanilla JavaScript/src/app.js
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
```

##### 해설
- `debounce`, `throttle` 라이브러리 구현 내용과 동작을 알아두시면 좋습니다.
  - `debounce`, `throttle`은 반복적으로 발생하는 이벤트등과 같은 처리를 할때 유용하게 사용할 수 있습니다, 위의 문제에서는 서버에 과도한 요청이 발생하지 않게 하기 위해 `debounce`를 적용하였습니다.
- `currntTarget`, `target` 차이를 알아두시면 좋습니다.
  - `currentTarget`은 이벤트가 바인딩된 객체를 가르키고, `target`은 이벤트버블링 발생시 이벤트가 발생한 객체를 가르킵니다.
  - `currentTarget`은 이벤트가 발생하는 순간에만 사용이 가능하며, `debounce`와 같은 비동기 처리함수에서는 `null` 값이 할당됩니다.

##### 참고자료
- https://developer.mozilla.org/ko/docs/Web/API/Event/target
- https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
- https://javascript.info/bubbling-and-capturing
- https://developer.mozilla.org/ko/docs/Web/API/Fetch_API



### q2. RxJS

#### A)
```js
// solution/2.others_1/1. Vanilla JavaScript/src/app.js
...

const API_URL = "https://api.thecatapi.com/v1/breeds/search";
const searchInputEl = document.querySelector(".SearchInput");
const loadingIndicatorEl = document.querySelector(".LoadingIndicator");
const textListEl = document.querySelector(".TextList");
const infoParagraphEl = document.querySelector(".InfoParagraph");

const inputStream = fromEvent(searchInputEl, "input").pipe(
  /**
   * 전달되는 객체의 속성 추출
   * `map((event) => { event.target.value })` 코드를 대체
   */
  pluck('target', 'value'),
  /**
   * 중복되는 데이터를 제거
   */
  distinctUntilChanged(),
  /**
   * 단어가 입력된 경우에만 처리
   */
  filter((value) => value),
  tap(() => {
    /**
     * 로딩 인디케이터 보임
     */
    loadingIndicatorEl.style.visibility = 'visible';
  }),
  /**
   * 마지막 키보드 입력 발생후 500ms 대기
   */
  debounceTime(500),
  switchMap(
    /**
     * 기존 스트림을 `ajaxGetJSON` 스트림으로 변경
     */
    (query) => ajaxGetJSON(`${API_URL}?q=${query}`).pipe(
      catchError((e) => {
        infoParagraphEl.textContent = '처리중 에러가 발생하였습니다!';
        return of(e);
      }),
    )),
  tap(() => {
    /**
     * 로딩 인디케이터 감춤
     */
    loadingIndicatorEl.style.visibility = 'hidden';
  }),
  filter((value) => {
    /**
    * 에러 객체가 전달된 경우 더이상 전달하지 않음
    */
    return !(value instanceof Error);
  }),
  tap((dataItems) => {
    const isEmptyResponseData = dataItems.length === 0;
    /**
     * 검색결과 없는 경우
     */
    infoParagraphEl.textContent = isEmptyResponseData ? '검색 결과가 없습니다.' : '';
    /**
     * 검색결과 있는 경우 목록 엘리먼트 노출
     */
    textListEl.style.visibility = isEmptyResponseData ? 'hidden' : 'visible';
  })
);

inputStream.subscribe({
  next: (dataItems) => {
    /**
    * 데이터를 HTML 문자열로 변환
    */
    const itemsHtml = dataItems.map(({ name }) => `<li>${name}</li>`).join('');
    /**
     * 데이터 목록을 화면에 랜더링
     */
    textListEl.innerHTML = itemsHtml;
  },
  /**
   * 스트림 에러가 발생한 경우 스트림이 닫힘
   */
  error: (e) => alert(`예상하지 못한 에러 발생! ${e.message}`)
});
```

### 해설
- 문제 1의 원리와 동일하게 `debounce` 기능을 활용하여 과도하게 발생하는 서버 요청을 줄였습니다.
- 문제 2 코드는 RxJS를 이용하여 작성된 코드입니다.
  - RxJS(Reactive Extensions For JavaScript)는 기존 코드와 달리 이벤트나 데이터 스트림을 처리하는 방식으로 프로그래밍 합니다.
  - RxJS에서 제공하는 `Operators`들의 기능을 잘 알고 활용하면 좋을것 같습니다.

### 참고자료
- https://www.learnrxjs.io/learn-rxjs/operators

## 결론
- RxJS를 잘 모른다면 조금 어려울 수 있는 문제 같습니다. 다양한 라이브러리를 사용해 보는것도 좋은것 같습니다. 대부분의 라이브러리나 프레임워크에는 만들게된 동기(Motivation)나, 지향점, 철학 또는 해결하고자 하는 목적이 있는데 라이브러리를 사용하기전에 한번 찾아보고 공감이 되신다면 금방 익숙해질것 같습니다.