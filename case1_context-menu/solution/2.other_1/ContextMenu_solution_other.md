## Case1 : ContextMenu - 대기업 S사 프론트엔드 개발자님의 답안

### q1. 문제 상황에 대하여 Java Script로 동작을 구현시킬 수 있는 코드를 작성해보세요

```js
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
```

##### 해설

1. 이벤트를 위임받기 적당한 컨테이너 셀렉터를 입력
- 아이템의 상위 요소라면 어떤걸 선택해도 문제되지는 않지만 가급적 가장 인접한 `container` 항목을 선택하는것이 좋음
(최상위 엘리먼트에 모든 이벤트가 집중된 경우, 매 이벤트 동작마다 등록된 모든 이벤트를 탐색해야하는 불필요한 연산이 발생하게되고, 더이상 사용되지 않는 자식요소 DOM 엘리먼트 제거시 바인딩된 이벤트를 직접 제거해 주지 않는경우에도 불필요한 연산이 발생)

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



### q2. 문제 상황에 대하여 jquery로 동작을 구현시킬 수 있는 코드를 작성해보세요

```js
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
```

##### 해설
1. [_Jquery_](https://jquery.com/) 라이브러리의 `on` 함수를 이용하여 이벤트 위임을 이용하여 이벤트를 추가
    - _Jquery_ 에서는 이벤트 위임이 이미 구현되어 있음 
    - [참고] https://api.jquery.com/on/

2. 클릭 이벤트가 상위로 전파되지 않도록 함수를 호출
    - [참고] https://developer.mozilla.org/ko/docs/Web/API/Event/stopPropagation

- **기본적인 구현원리는 [Javascript 문제풀이](#문제-풀이-설명-explanation1)와 동일합니다.**
- **이벤트 위임 구현 로직을 _Jquery_ 이벤트 바인딩 함수(`on`)에서 제공하는 기능으로 대체**
    - _Jquery_ 라이브러리에서 제공하는 이벤트 바인딩 함수(`on`)의 두번째 인자에 _Selector_ 를 지정하는 경우 이벤트 위임을 사용하실 수 있습니다.
    - [참고] https://api.jquery.com/on/



### q3. 문제 상황에 대하여 jquery로 동작을 구현시킬 수 있는 코드를 작성해보세요

```js
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
```

##### 해설
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


    
### q4. 문제 상황에 대하여 React로 동작을 구현시킬 수 있는 코드를 작성해보세요

```js
import React, { useState, useRef, useLayoutEffect } from "react";
import "./style.css";
import Detail from "./Detail";
import dummyData from "./dummyData";

export default function App() {
  /**
   * 가장 최근에 열린 `defail` 저장
   */
  const latestOpenedItemElRef = useRef(null);

  /**
   * 가장 최근에 열린 `defail` 닫음
   */
  const closeLatestOpenedItem = () => {
    if (latestOpenedItemElRef.current) {
      latestOpenedItemElRef.current.removeAttribute("open");
    }
  };

  useLayoutEffect(() => {
    /**
     * `document`에 클릭 이벤트 발생시 가장 최근에 열린 `detail`을 닫음
     */
    document.addEventListener("click", closeLatestOpenedItem);
    return () => {
      document.removeEventListener("click", closeLatestOpenedItem);
    };
  }, []);

  const handleClickDetail = e => {
    /**
     * `toggle` 이벤트가 발생하지 않도록 기본 이벤트 동작 취소
     */
    e.preventDefault();
    /**
     * `click` 이벤트가 `document` 까지 전파되지 않도록 방지
     */
    e.stopPropagation();
    const currentTarget = e.currentTarget;
    const latestOpenedItemEl = latestOpenedItemElRef.current;

    closeLatestOpenedItem();

    if (currentTarget === latestOpenedItemEl) {
      return;
    }

    currentTarget.setAttribute("open", "");
    latestOpenedItemElRef.current = currentTarget;
  };

  return (
    <div className="container">
      {dummyData.map(({ text, context }, index) => {
        return (
          <Detail
            key={`detail${index}`}
            popover={context}
            onClick={handleClickDetail}
          >
            {text}
          </Detail>
        );
      })}
    </div>
  );
}
```
