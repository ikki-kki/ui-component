import React from "react";

const Detail = ({ text, context, open, onToggle }) => (
  <details open={open}>
    <summary onClick={onToggle}>{text}</summary>
    <p>{context}</p>
  </details>
);
export default Detail;
