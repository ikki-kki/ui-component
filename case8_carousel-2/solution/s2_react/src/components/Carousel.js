import useCarousel from '../hooks/useCarousel';
import styled from 'styled-components';

/* 캐러셀의 window 역할을 한다. */
const Container = styled.div`
  width: ${({ width }) => width}px;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  /* carousel 요소의 width 셋팅이 완료될 때까지 감춘다. */
  opacity: ${({ width }) => (width ? 1 : 0)}; ;
`;

const Slides = styled.div`
  /* 수평 정렬 */
  display: flex;
  transition: transform ${({ duration }) => duration}ms ease-out;
  transform: translate3D(calc(var(--currentSlide) * -100%), 0, 0);
  transform: translate3D(${({ currentSlide }) => currentSlide * -100}%, 0, 0);
`;

const Img = styled.img`
  padding: 5px;
`;

const Control = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2em;
  color: #fff;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  z-index: 99;
  &:focus {
    outline: none;
  }
`;

const PrevControl = styled(Control)`
  left: 0;
`;

const NextControl = styled(Control)`
  right: 0;
`;

const Carousel = ({ images }) => {
  const { width, currentSlide, duration, isMoving, setWidth, setIsMoving, move } = useCarousel();

  const handleImageLoad = ({ target }) => {
    if (width !== target.offsetWidth) setWidth(target.offsetWidth);
    move(1);
  };

  const handleClick = ({ target: { id } }) => {
    // isMoving 상태를 확인하여 transition 중에는 이동을 허용하지 않는다.
    if (isMoving) return;

    // prev 버튼이 클릭되면 currentSlide를 -1하고 next 버튼이 클릭되면 currentSlide를 +1한다.
    const delta = id === 'prev' ? -1 : 1;
    move(currentSlide + 1 * delta, 500);
  };

  const handleTransitionEnd = () => {
    setIsMoving(false);

    // currentSlide === 0, 즉 선두에 추가한 클론 슬라이드면 currentSlide += images.length로 image의 마지막(images.length)으로 이동
    // currentSlide === images.length + 1, 즉 마자막에 추가한 클론 슬라이드면 currentSlide -= images.length로 image의 선두(1)로 이동
    const delta = currentSlide === 0 ? 1 : currentSlide === images.length + 1 ? -1 : 0;

    // 클론 슬라이드가 아니면(delta === 0) 이동하지 않는다.
    if (delta) move(currentSlide + images.length * delta);
  };

  return (
    <Container width={width}>
      <Slides currentSlide={currentSlide} duration={duration} onTransitionEnd={handleTransitionEnd}>
        {[images[images.length - 1], ...images, images[0]].map((url, i) => (
          <Img key={i} src={url} onLoad={handleImageLoad} />
        ))}
      </Slides>
      <PrevControl id="prev" onClick={handleClick}>
        &laquo;
      </PrevControl>
      <NextControl id="next" onClick={handleClick}>
        &raquo;
      </NextControl>
    </Container>
  );
};

export default Carousel;
