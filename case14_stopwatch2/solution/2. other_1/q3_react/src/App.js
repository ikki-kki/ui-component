import { useState, useRef, useCallback } from 'react';
import Button from './Button';
import styled from 'styled-components';

const Clock = styled.div`
  margin : 100px 0 20px 0;
  span {
    font-size:30px;
    font-weight:bold;
  }

`;

export default function App() {
  /**
   * 타이머 시간(초)
   */
  const [seconds, setSeconds] = useState(0)
  /**
   * `intervalId`는 랜더링과 관련이 없기 때문에 `useRef`를 이용하여 처리합니다.
   * [>] 값 변화시 화면에 즉각적으로 업데이트 되어야하는 데이터라면 `useState`를 이용해 주세요
   */
  const intervalIdRef = useRef(null);

  /**
   * [!] 리액트에서 이벤트 핸들러는 `handle~`으로 네이밍하는 관례(Convention)가 있습니다.
   * @see https://blog.sonim1.com/220
   */
  const handleClickStartTimerButton = useCallback(() => {
    intervalIdRef.current = setInterval(() => {
      setSeconds((seconds) => {
        return seconds += 1;
      })
    }, 1000);
  }, []);

  const handleClickPauseTimerButton = useCallback(() => {
    const intervalId = intervalIdRef.current;
    if (intervalId) {
      clearInterval(intervalId)
    }
  }, []);

  const handleClickResetTimerButton = useCallback(() => {
    const intervalId = intervalIdRef.current;
    if (intervalId) {
      clearInterval(intervalId)
    }
    setSeconds(0);
  }, [setSeconds]);

  let min = Math.floor(seconds / 60);
  min = 10 > min ? '0' + min : min;
  let sec = seconds % 60;
  sec = 10 > sec ? '0' + sec : sec;

  return (
    <div className="container">
      <Clock>
        <span>{min}</span> : <span>{sec}</span>
      </Clock>
      <div>
        <Button text={'시작'} onClick={handleClickStartTimerButton} className="btn-default" />
        <Button text={'중지'} onClick={handleClickPauseTimerButton} className="btn-danger" />
        <Button text={'리셋'} onClick={handleClickResetTimerButton} className="btn-primary" />
      </div>
    </div>
  );
}