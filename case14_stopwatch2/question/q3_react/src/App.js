import { useState , useEffect , useRef } from 'react';
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

  let [ min , setMin ] = useState(0);
  let [ sec , setSec ] = useState(0);
  let [ pending , setPending ] = useState(true);

  useEffect( () => {

    // q3-1) setInterval 또는 setTimeout 으로 반복시키는 부분을 완성한다.

  });
  

  useEffect( () => {

    // q3-2) 60초가 될때를 감지하는 부분을 완성한다.

  });


  const startTimer = () => {
    setPending(false);
  }

  const pauseTimer = () => {
    setPending(true);
  }

  const resetTimer = () => {
    setPending(true);
    setSec(0);
    setMin(0);
  }

  const htmlMin = ('0' + min).slice(-2);
  const htmlSec = ('0' + sec).slice(-2);

  return (
    <div className="container">
        <Clock>
            <span>{htmlMin}</span> :
            <span>{htmlSec}</span>
        </Clock>
        <div>
            <Button text={'시작'} onClick={startTimer} className="btn-default" />
            <Button text={'중지'} onClick={pauseTimer} className="btn-danger" />
            <Button text={'리셋'} onClick={resetTimer} className="btn-primary" />
        </div>
    </div>
  );
}