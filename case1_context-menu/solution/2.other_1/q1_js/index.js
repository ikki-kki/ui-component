// Write Javascript code here!

/**
 * 각 아이템 항목의 클릭 이벤트를 위임받을 컨테이너
 */
const containerEl = document.querySelector(".container");

/**
 * 가장 마지막으로 선택된 엘리먼트를 저장
 */
let latestOpnedEl = null;

/**
 * 클릭 이벤트가 `Document` 까지 전파된 경우 마지막에 열린 창을 닫음
 */
document.addEventListener("click", e => {
  if (latestOpnedEl) {
    latestOpnedEl?.classList.remove("open");
    latestOpnedEl = null;
  }
});

/**
 * 컨테이너에 클릭 이벤트를 바인딩
 */
containerEl.addEventListener("click", e => {
  /**
   * 이벤트가 상위(`Document`) 객체로 전달되지 않도록 `stopPropagation` 호출
   * @see https://developer.mozilla.org/ko/docs/Web/API/Event/stopPropagation
   */
  e.stopPropagation();
  const targetEl = e.target;

  /**
   * 가장 마지막에 선택된 엘리먼트의 `open` 클래스를 제거
   */
  latestOpnedEl?.classList.remove("open");

  /**
   * 현재 선택된 엘리먼트와 마지막에 선택된 엘리먼트가 동일하다면 아무것도 하지 않음
   */
  if (latestOpnedEl === targetEl) {
    latestOpnedEl = targetEl;
    return;
  }

  targetEl?.classList.add("open");
  latestOpnedEl = targetEl;
});



/**
 * 
 *
<A 개발자님의 접근법 Point>

1. 이벤트를 위임받기 적당한 컨테이너 셀렉터를 입력
- 아이템의 상위 요소라면 어떤걸 선택해도 문제되지는 않지만 가급적 가장 인접한 `container` 항목을 선택하는것이 좋음
(최상위 엘리먼트에 모든 이벤트가 집중된 경우, 매 이벤트 동작마다 등록된 모든 이벤트를 탐색해야하는 불필요한 연산이 발생하게되고, 더이상 사용되지 않는 자식요소 DOM 엘리먼트 제거시 
바인딩된 이벤트를 직접 제거해 주지 않는경우에도 불필요한 연산이 발생)

2. 이벤트 객체에서 이벤트가 발생된 엘리먼트 객체를 선택해 주세요. 
- `e.target`, `e.currentTarget` 두 값의 의미를 제대로 구분할 수 있어야함
    - [참고] https://developer.mozilla.org/ko/docs/Web/API/Event/target
    - [참고] https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget



- **각각의 항목에 이벤트를 바인딩 하지 않고 컨테이너에서 이벤트를 위임(Event Delegation)받아 처리함으로써 이벤트 처리 성능 향상**
  > 항목별 이벤트를 직접 등록하는 경우 이벤트 리스너를 등록하는 시간과 메모리 리소스 사용이 증가합니다. 항목이 적거나 성능이 좋은 최신 브라우저에서는 차이를 느끼기 쉽지 않지만, IE8 이하 버전과 같은 
    구형 브라우저 버전에서는 항목이 늘어나면 성능 차이가 눈에 보일 정도로 느껴질 수 있습니다. 
    - `containerEl` 하위요소에서 발생하는 _click_ 이벤트는 버블링되어 `containerEl`으로 전파되어 `containerEl`에 등록된 클릭 이벤트 리스너에서 처리됨
    - [참고] https://developer.mozilla.org/ko/docs/Web/API/Event/eventPhase
    - [참고] https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener


- **DOM 탐색 시간을 줄이기 위해 `latestOpnedEl` 변수에 가장 마지막으로 열린 _HTMLElement_ 항목을 저장**
  - 매 번 _DOM_ 을 순회하며 _Attribute_ 에 저장된 상태를 확인하여 열려있는 _HTMLEement_ 를 확인하는 방법도 있지만, 불필요한 연산을 줄여 성능을 조금더 빠르게 하기 위해 가장 마지막에 열린 _HTMLElement_ 를 `latestOpnedEl` 변수에 저장하도록 구현 하였습니다.


- **`latestOpnedEl` 상태를 사용하는 이유**
  > [!] 위와 같이 성능을 더 높히는 대신 `latestOpnedEl` 변수의 상태를 관리해야하는 약간의 번거로움(?)이 있습니다. 이 부분에 대해서는 어플리케이션의 성능이나 복잡도를 고려하여 개발상황에 맞게 참고하면 
    좋을것 같습니다.
    - 이벤트 위임을 사용함으로써 자동으로 이벤트 리스너를 등록되어 관리가 필요 없는 이점도 있지만, 가능하다면 성능적인 부분은 작은곳부터 관리하는게 좋습니다. 가령 항목의 갯수가 100개 이상이라고 가정 했을때 
      항목을 클릭할때마다 100개의 리스트에서 열려있는 상태의 _HTMLElement_ 찾아야 합니다.


 */