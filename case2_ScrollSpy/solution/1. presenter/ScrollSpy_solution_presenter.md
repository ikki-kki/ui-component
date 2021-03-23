## Case2 : ScrollSpy - 출제자 해설

### q1. 문제 상황에 대하여 Java Script로 동작을 구현시킬 수 있는 코드를 작성해보세요

#### A)

```js
// index.js

import "./style.css";

const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);
const offsetTops = contentItems.map((elem) => {
  const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
  return [ofs - clh / 2, ofs + clh / 2];
});

window.addEventListener("scroll", (e) => {
  const { scrollTop } = e.target.scrollingElement;
  // do something
  const targetIndex = Math.max(
    offsetTops.findIndex(([from, to]) => scrollTop >= from && scrollTop < to),
    0
  );
  Array.from(navElem.children).forEach((c, i) => {
    c.classList[i === targetIndex ? "add" : "remove"]("on");
  });
});

navElem.addEventListener("click", (e) => {
  const targetElem = e.target;
  if (targetElem.tagName === "BUTTON") {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
});

```

##### 해설
- offsetTop, scrollTop, clientHeight의 상관관계를 이해한다. scrollIntoView의 사용법을 익힌다.



### q2. resize에 무관하게 동작하게끔 처리해보자

#### A)

```js
// index.js

import "./style.css";

const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);
const getOffsetTops = (() => {
  let offsetTops = [];
  let prevHeight = 0;
  return () => {
    if (window.innerHeight === prevHeight) {
      return offsetTops;
    }
    offsetTops = contentItems.map(elem => {
      const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
      return [ofs - clh / 2, ofs + clh / 2];
    });
    prevHeight = window.innerHeight;
    return offsetTops;
  };
})();

window.addEventListener("scroll", e => {
  const { scrollTop } = e.target.scrollingElement;
  const targetIndex = Math.max(
    getOffsetTops().findIndex(
      ([from, to]) => scrollTop >= from && scrollTop < to
    ),
    0
  );
  Array.from(navElem.children).forEach((c, i) => {
    i === targetIndex ? c.classList.add("on") : c.classList.remove("on");
  });
});

navElem.addEventListener("click", (e) => {
  const targetElem = e.target;
  if (targetElem.tagName === "BUTTON") {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
});


```

##### 해설
- 화면 높이가 바뀌면 변경내용을 반영할 필요가 있다.



### q3. resize listener를 적용해서 구현해보자.

#### A)

```js
// index.js

import "./style.css";

const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);

let offsetTops = [];
const getOffsetTops = () => {
  // do something
  offsetTops = contentItems.map(elem => {
    const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
    return [ofs - clh / 2, ofs + clh / 2];
  });
};
getOffsetTops();

window.addEventListener("scroll", e => {
  const { scrollTop } = e.target.scrollingElement;
  const targetIndex = Math.max(
    offsetTops.findIndex(([from, to]) => scrollTop >= from && scrollTop < to),
    0
  );
  Array.from(navElem.children).forEach((c, i) => {
    i === targetIndex ? c.classList.add("on") : c.classList.remove("on");
  });
});

window.addEventListener("resize", getOffsetTops);

navElem.addEventListener("click", e => {
  const targetElem = e.target;
  if (targetElem.tagName === "BUTTON") {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  }
});

```

##### 해설
- 2의 함수는 리사이즈가 있을 때엔 의미가 있으나, 그렇지 않은 경우에도 스크롤할 때마다 함수가 실행되면서 각 엘리먼트의 높이를 구하게 된다. 이보다는 리사이즈시에만 계산을 하고, 평소에는 미리 계산된 값을 이용하는게 효율적일 것이다.



### q4. throttle로 처리

#### A)

```js
//util.js
export const debounce = (func, delay) => {
  let timeoutId = null;
  return (...arg) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(null, ...arg), delay);
  };
};

export const throttle = (func, ms) => {
  let throttled = false;
  // do something
  return (...args) => {
    if (!throttled) {
      throttled = true;
      setTimeout(() => {
        func(...args);
        throttled = false;
      }, ms);
    }
  };
};

```

##### 해설
- 스크롤 이벤트는 스크롤 동작을 하는 동안 계속해서 발생하므로 모든 이벤트에 대해 콜백을 호출하는 것은 성능에 좋지 않다. 마지막 이벤트만을 감시하는 것으로 충분했던 무한스크롤과 달리 연속적인 이벤트에 대해 꾸준히 변경사항을 반영하는 것이 필요하므로, throttle이 적합하다.


### q5. intersection Observer 활용

#### A)

```js
//index.js

import "./style.css";

const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);

const scrollSpyObserver = new IntersectionObserver(
  (entries) => {
    // do something
    const { target } = entries.find((entry) => entry.isIntersecting) || {};
    const targetIndex = contentItems.indexOf(target);
    Array.from(navElem.children).forEach((c, i) => {
      c.classList[i === targetIndex ? "add" : "remove"]("on");
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  }
);
contentItems.forEach((item) => scrollSpyObserver.observe(item));

navElem.addEventListener("click", (e) => {
  const targetElem = e.target;
  if (targetElem.tagName === "BUTTON") {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
});

```


### q6. React + intersection Observer 활용

#### A)

```js
//App.js

import React, { useState, useRef, useEffect } from "react";
import Nav from "./Nav";
import Content from "./Content";
import "./style.css";

const pages = Array.from({ length: 8 }).map((_, i) => i + 1);

const App = () => {
  const [viewIndex, setViewIndex] = useState(0);
  const contentRef = useRef([]);
  const moveToPage = (index) => () => {
    // do something
    contentRef.current[index].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  const scrollSpyObserver = new IntersectionObserver(
    (entries) => {
      // do something
      const { target } = entries.find((entry) => entry.isIntersecting) || {};
      setViewIndex(contentRef.current.indexOf(target));
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }
  );

  useEffect(() => {
    contentRef.current.forEach((item) => scrollSpyObserver.observe(item));
    return () => {
      contentRef.current.forEach((item) => scrollSpyObserver.unobserve(item));
    };
  }, []);

  return (
    <div id="app">
      <Nav pages={pages} viewIndex={viewIndex} moveToPage={moveToPage} />
      <div id="contents">
        {pages.map((p, i) => (
          <Content key={p} ref={(r) => (contentRef.current[i] = r)} page={p} />
        ))}
      </div>
    </div>
  );
};

export default App

```