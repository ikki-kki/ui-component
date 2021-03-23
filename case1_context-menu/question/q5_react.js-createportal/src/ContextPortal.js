import { createPortal } from "react-dom";

const ContextPortal = ({ children, target }) => {
  return target ? createPortal(children, target) : null;
};

export default ContextPortal;
