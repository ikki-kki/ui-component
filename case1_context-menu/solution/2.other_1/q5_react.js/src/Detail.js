import React from "react";

const Detail = ({ children, popover, onClick = () => null }) => {
  return (
    <details onClick={onClick}>
      <summary>{children}</summary>
      <p>{popover}</p>
    </details>
  );
};
export default Detail;
