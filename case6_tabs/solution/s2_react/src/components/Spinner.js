import styled from 'styled-components';

const Spinner = styled.img.attrs({
  src: '/img/ball-triangle.svg',
  alt: 'Loading...'
})`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate3D(-50%, 0, 0);
  width: 50px;
`;

export default Spinner;
