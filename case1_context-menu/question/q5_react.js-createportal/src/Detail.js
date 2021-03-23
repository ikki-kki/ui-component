import React, { forwardRef } from "react";

const Detail = ({ text, open, onToggle }, ref) => {
  return (
    <details open={open} ref={ref}>
      <summary onClick={onToggle}>{text}</summary>
    </details>
  );
};
export default forwardRef(Detail);
