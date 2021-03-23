import styled from "styled-components";

const BodyBlackoutStyle = styled.div`
  position: absolute;
  z-index: 1010;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .65);
  display: ${props => props.isVisible ? "block" : "none" };
`;

export default function BodyBlackout({ isVisible , onSetIsVisible  }){
  return <BodyBlackoutStyle 
    isVisible={isVisible} 
    onClick={ ()=>{ onSetIsVisible(false) } }
  />
}