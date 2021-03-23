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
