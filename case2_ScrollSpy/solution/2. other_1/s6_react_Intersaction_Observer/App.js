import React, { useState, useRef, useEffect } from "react";
import Nav from "./Nav";
import Content from "./Content";
import "./style.css";

const pages = Array.from({ length: 8 }).map((_, i) => i + 1);

const App = () => {
  const [viewIndex, setViewIndex] = useState(0);
  const contentRef = useRef([]);
  const moveToPage = (index) => () => {
    contentRef.current[index].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  const scrollSpyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const {
          isIntersecting,
          boundingClientRect
        } = entry;
        /**
         * 페이지의 현재 스크롤 위치
         */
        const scrollTop = window.pageYOffset;
        /**
         * Intersection 이벤트 발생한 요소의 높이 값
         */
        const { height } = boundingClientRect;

        if (isIntersecting) {
          /**
           * 스크롤 위치 / 요소의 높이 = 반올림 ⇒ 현재 요소의 위치
           */
          const index = Math.round(scrollTop / height);
          setViewIndex(index);
        }
      })
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

export default App;
