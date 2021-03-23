// Write JQuery code here!
/**
 * 각 아이템 항목의 클릭 이벤트를 위임받을 컨테이너
 */
const $container = $(".container");

/**
 * 가장 마지막으로 선택된 엘리먼트를 저장
 */
let $latestOpned = null;

$(document).on("click", () => {
  if ($latestOpned) {
    $latestOpned.removeClass("open");
    $latestOpned = null;
  }
});

/**
 * Jquery `on` 함수를 이용하여 이벤트 위임하여 바인딩
 */
$container.on("click", ".item", e => {
  e.stopPropagation();

  // ⇛ 1) Jquery 라이브러리의 on 함수를 이용하여 이벤트 위임을 이용하여 이벤트를 추가해 주세요
  const $target = $(e.target);
  /**
   * 가장 마지막에 선택된 엘리먼트의 `open` 클래스를 제거
   */
  $latestOpned?.removeClass("open");

  /**
   * 현재 선택된 엘리먼트와 마지막에 선택된 엘리먼트가 동일하다면 아무것도 하지 않음
   */
  if ($latestOpned?.get(0) === $target?.get(0)) {
    $latestOpned = $target;
    return;
  }

  $target.addClass("open");
  $latestOpned = $target;
});



/**
 * 
 * 
<A 개발자님의 접근법 Point>
1. [_Jquery_](https://jquery.com/) 라이브러리의 `on` 함수를 이용하여 이벤트 위임을 이용하여 이벤트를 추가
    - _Jquery_ 에서는 이벤트 위임이 이미 구현되어 있음 
    - [참고] https://api.jquery.com/on/

2. 클릭 이벤트가 상위로 전파되지 않도록 함수를 호출
    - [참고] https://developer.mozilla.org/ko/docs/Web/API/Event/stopPropagation


- **기본적인 구현원리는 [Javascript 문제풀이](#문제-풀이-설명-explanation1)와 동일합니다.**
- **이벤트 위임 구현 로직을 _Jquery_ 이벤트 바인딩 함수(`on`)에서 제공하는 기능으로 대체**
    - _Jquery_ 라이브러리에서 제공하는 이벤트 바인딩 함수(`on`)의 두번째 인자에 _Selector_ 를 지정하는 경우 이벤트 위임을 사용하실 수 있습니다.
    - [참고] https://api.jquery.com/on/


 */