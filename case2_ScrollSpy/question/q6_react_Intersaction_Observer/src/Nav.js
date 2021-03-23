import React from "react";

const Nav = ({ pages, viewIndex, moveToPage }) => (
  <ul id="nav">
    {pages.map((p, i) => (
      <li key={p} className={viewIndex === i ? "on" : ""}>
        <button onClick={moveToPage(i)}>{p}</button>
      </li>
    ))}
  </ul>
);

export default Nav;
