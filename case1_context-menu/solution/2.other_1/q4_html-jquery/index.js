// Write JQuery code here!
/**
 * 각 아이템 항목의 클릭 이벤트를 위임받을 컨테이너
 */
const $container = $(".container");
/**
 * 가장 마지막으로 선택된 엘리먼트를 저장
 */
let $latestOpend = null;

$(document).on("click", e => {
  $latestOpend?.removeAttr("open");
  $latestOpend = null;
});

$container.on("click", "details", e => {
  e.stopPropagation();
  e.preventDefault();

  /**
   * 이벤트가 바인딩된 엘리먼트
   */
  const $target = $(e.currentTarget);

  $latestOpend?.removeAttr("open");

  if ($latestOpend?.get(0) === $target?.get(0)) {
    return;
  }

  $target?.attr("open", "");
  $latestOpend = $target;
});



/**
 * 
 * 
<A 개발자님의 접근법 Point>
1. 이벤트 객체에서 이벤트가 발생된 엘리먼트 객체를 선택
  - Jquery 클릭 이벤트 발생시 `target`, `currentTarget`, `delegateTarget` 차이에 대한 이해가 필요
  - [참고] https://api.jquery.com/event.target/
  - [참고] https://api.jquery.com/event.currentTarget/
  - [참고] https://api.jquery.com/event.delegatetarget/


- **기본적인 구현원리는 [HTML 'details' 활용](#문제-풀이-설명-explanation3)과 동일합니다.**
- **이벤트 위임 구현 로직을 _Jquery_ 이벤트 바인딩 함수(`on`)에서 제공하는 기능으로 대체**
  - _Jquery_ 라이브러리에서 제공하는 이벤트 바인딩 함수(`on`)의 두번째 인자에 _Selector_ 를 지정하는 경우 이벤트 위임을 사용하실 수 있습니다.


 */