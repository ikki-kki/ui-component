import styled from "styled-components";

const ButtonStyle = styled.div`
  position: absolute;
  top:50%;
  width: 3rem;
  height: 3rem;
  background-color: #FFF;
  transform: translateY(-50%);
  border-radius: 50%;
  cursor: pointer; 
  z-index: 1001; 
  border:1px solid black;

  &:after {
    content: " ";
    position: absolute;
    width: 10px;
    height: 10px;
    top: 50%;
    left: 54%;
    border-right: 2px solid black;
    border-bottom: 2px solid black;
    transform: translate(-50%, -50%) rotate(135deg);
  }

  ${({ prev }) => prev && `
    left:0;
  `}

  ${({ next }) => next && `
    right:0;

    &:after {
      left: 47%;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  `}

`;

export default function Button({ prev , next , handleSlide }){
  return (
    <ButtonStyle 
      prev={prev}
      next={next}
      onClick={ handleSlide }
    />
  )
}