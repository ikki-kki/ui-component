import { createPortal } from "react-dom";

// 리액트 돔이 제공하는 createPortal을 이용해서 children 과 target을 넘겨주는 형태
const ContextPortal = ({ children, target }) => {
  // 타겟이 있을때만
  return target ? createPortal(children, target) : null;
};

export default ContextPortal;
