// Write Javascript code here!
/**
 * 각 아이템 항목의 클릭 이벤트를 위임받을 컨테이너
 */
const containerEl = document.querySelector(".container");
/**
 * 가장 마지막으로 선택된 엘리먼트를 저장
 */
let latestOpendEl = null;

document.addEventListener("click", () => {
  latestOpendEl?.removeAttribute("open");
  latestOpendEl = null;
});

containerEl.addEventListener("click", e => {
  let detailsEl = e.target;
  /**
   * 가장 마지막에 선택된 `details` 엘리먼트의 `open` 속성을 제거
   */
  latestOpendEl?.removeAttribute("open");
  /**
   * 현재 클릭된 엘리먼트로 부터 부모 엘리먼트를 확인하여 `details` 엘리먼트를 찾음
   * 루트 엘리먼트에 도달한 경우 `target.parentElement` 값은 `null`
   */
  do {
    /**
     * 현재 클릭된 엘리먼트의 부모 엘리먼트가 `details`인 경우
     */
    if (detailsEl?.tagName === "DETAILS") {
      /**
       * 태그의 기본동작을(이벤트) 막아 `open` 속성이 자동으로 추가되지 않도록 함
       */
      e.stopPropagation();
      e.preventDefault();

      if (detailsEl === latestOpendEl) {
        /**
         * 현재 선택된 `details` 엘리먼트가 마지막 선택된 `details`와 동일한 경우 아무것도 하지 않음
         */
        latestOpendEl = null;
        break;
      }

      /**
       * `open` 속성을 수동으로 추가
       */
      detailsEl.setAttribute("open", "");
      latestOpendEl = detailsEl;
      break;
    }
  } while ((detailsEl = detailsEl?.parentElement) !== null);
});




/**
 * 
 * 
<A 개발자님의 접근법 Point>
1. 기본 이벤트(태그 동작)이 실행되지 않도록 특정 함수를 호출
    - 이벤트 위임 구현 원리, 이벤트 취소(`preventDefault`)에 대한 이해가 필요한 내용으로 보여짐
    - [참고] https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault

- **기본적인 구현원리는 [Javascript 문제풀이](#문제-풀이-설명-explanation1)와 동일합니다.**

- **이벤트 발생시 현재 타겟(클릭된)으로부터 `details` 태그를 탐색하는 코드가 추가.**
    - `details` 태그 하위에는 다른 태그 속성들이 중첩되어 포함될 수 있기 때문에, 클릭된 태그(`HTMLElement`)로 부터 한단계씩 상위 태그를 확인하며 `details` 태그가 나타날때 까지 탐색하고 결과를 저장합니다.

- **`toggle` 이벤트 대신 `click` 이벤트를 사용하는 이유**
    - `details` 태그는 `toggle` 이벤트를 지원하지만, 컨테이너 태그인 `div`에서는 `toggle` 이벤트를 리스닝 할 수 없기 때문에, 컨테이너 `div`에서는 `click` 이벤트를 활용하여 `toggle` 이벤트가 발생하기 전 
      `e.preventDefault()` 를 이용하여 _toggle_ 동작을 실행되지 않도록하고 `open` 속성을 직접 추가하도록 구현 하였습니다.
    - [참고] https://developer.mozilla.org/ko/docs/Web/HTML/Element/details
    

 */