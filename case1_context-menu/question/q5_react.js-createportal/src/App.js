import React, { useRef, useState, useEffect } from "react";
import "./style.css";
import Detail from "./Detail";
import dummyData from "./dummyData";
import ContextPortal from "./ContextPortal";

export default function App() {
  const [openedIndex, setOpen] = useState(null);
  // 콘솔을 찍어보면 details에 대한 돔 정보가 모두 담겨있다.
  const detailRefs = useRef([]);

  const togglePopover = (index) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(e.target.parentElement.open ? null : index);
  };

  const closeAll = () => {
    setOpen(null);
  };

  useEffect(() => {
    document.body.addEventListener("click", closeAll);
    return () => {
      document.body.removeEventListener("click", closeAll);
    };
  }, []);

  return (
    <>
      <div className="wrapper">
        {dummyData.map(({ text, context }, i) => (
          <Detail
            key={`detail${i}`}
            ref={(r) => (detailRefs.current[i] = r)}
            text={text}
            context={context}
            open={openedIndex === i}
            onToggle={togglePopover(i)}
          />
        ))}
      </div>
      <ContextPortal
        // 선택한 ref에서 open되어있는 것을 찾기
        target={detailRefs.current[openedIndex]}
        // open된 인덱스에 해당되는 p태그 context를 주입
        // 만들어지는건 html에 만들어지지만 ContextPortal에서 만들어져서 넘겨진다
        children={<p>{dummyData[openedIndex]?.context}</p>}
      />
    </>
  );
}

//? ContextPortal의 장점
// 1. Props로 내려주는 상위, 하위 관계에서 필요한 정보를 담고 있으면서
//    별개의 컴포넌트에 정보를 그대로 전달하고 싶을 때 쓰기 좋다.
// 2. 모달이나 팝업같은 플로팅UI를 제어할때 강력한 도구이다.
// 3. <p>태그가 기존의 display:none으로 보여주지 않는것이 아니라 애초에 '없었기' 때문에 보안에 강하다
//    또한 팝업/모달을 오픈 할 때마다 서버에서 새로운 정보를 가져와야 할 경우에는 ContextPortal을 사용하는 것이 좋다.
//    브라우저에 따른 성능 차이는 거의 없다고 볼 수 있다.

//! 마무리
// - html이나 css로 처리할 수 있는게 있다면 최대한 활용하는게 좋다
// - 자바스크립트가 관여하지 못하는 상황에서 어느정도 완결성 있는 화면을 보여줄 수 있기 때문이다.
