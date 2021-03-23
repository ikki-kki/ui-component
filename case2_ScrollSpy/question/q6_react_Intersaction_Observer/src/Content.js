import React, { forwardRef } from "react";

const Content = ({ page }, ref) => <div ref={ref}>{page}</div>;

export default forwardRef(Content);
