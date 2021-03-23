import { fromEvent, of } from "rxjs";
import { ajaxGetJSON } from "rxjs/internal/observable/dom/AjaxObservable";
import {
  debounceTime,
  distinctUntilChanged,
  pluck,
  tap,
  switchMap,
  catchError,
  filter
} from "rxjs/operators";

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