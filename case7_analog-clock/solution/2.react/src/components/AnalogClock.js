import useAnalogClock from '../hooks/useAnalogClock';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background-color: #fff;
  border-radius: 50%;
  margin: 40px auto;
  border: 5px solid white;
  box-shadow: inset 2px 3px 8px 0 rgba(0, 0, 0, 0.1);

  &::after {
    content: '';
    width: 15px;
    height: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: black;
    border-radius: 50%;
    z-index: 100;
  }
`;

const Hand = styled.div`
  --deg: 0;
  position: absolute;
  bottom: 50%;
  left: 50%;
  border: 1px solid white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transform-origin: bottom;
  transform: translate3D(-50%, 0, 0) rotate(calc(var(--deg) * 1deg));
  z-index: 10;
`;

const HourHand = styled(Hand)`
  width: 8px;
  height: 80px;
  background-color: black;
`;

const MinuteHand = styled(Hand)`
  width: 6px;
  height: 110px;
  background-color: black;
`;

const SecondHand = styled(Hand)`
  width: 4px;
  height: 120px;
  background-color: red;
`;

const Mark = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  transform: rotate(${props => props.index * 30}deg);
`;

const AnalogClock = () => {
  const [$hourHand, $minuteHand, $secondHand] = useAnalogClock();

  return (
    <Container>
      <HourHand ref={$hourHand} />
      <MinuteHand ref={$minuteHand} />
      <SecondHand ref={$secondHand} />
      {Array.from({ length: 12 }, (_, i) => (
        <Mark key={i} index={i}>
          |
        </Mark>
      ))}
    </Container>
  );
};

export default AnalogClock;
