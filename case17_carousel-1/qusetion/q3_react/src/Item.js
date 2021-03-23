import styled from "styled-components";
const ItemStyle = styled.img`

  opacity: 0;
  position: absolute;
  top:0;
  width: 100%;
  margin: auto;
  padding: 1rem 4rem;
  z-index: 100;
  transition: transform .5s, opacity .5s, z-index .5s;

  transform: ${props => props.prev ? "translateX(-100%)" : ""};
  transform: ${props => props.next ? "translateX(100%)" : ""};
  z-index: ${props => props.prev || props.next ? 800 : ""};
  
  ${({ active }) => active && `
    opacity: 1;
    position: relative;
    z-index: 900;
  `}


`;

export default function Item({ src , active , prev , next }){
  return (
    <ItemStyle 
      src={src} 
      active={active}
      prev={prev}
      next={next}
      alt="" />
  )
}