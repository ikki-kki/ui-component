import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <>
    {/* DO NOT FIX THIS FILE */}
    <header>
      <h2>Q1 - 5. 리액트 (1)</h2>
      <ul>
        <li>목록을 클릭하면 해당 아이템에 대한 컨텍스트메뉴가 나타나고,</li>
        <li>메뉴를 선택하거나 그 외의 부분을 클릭하면 사라지는</li>
        <li>팝오버 컴포넌트를 구현하세요.</li>
        <li>팝오버는 한 번에 하나만 보여야 합니다.</li>
      </ul>
    </header>
    <App />
  </>,
  document.getElementById("root")
);
