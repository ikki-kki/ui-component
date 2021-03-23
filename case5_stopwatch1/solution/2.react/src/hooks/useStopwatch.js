import { useState, useEffect } from 'react';

const formatElapsedTime = (() => {
  // 1 => '01', 10 => '10'
  const format = n => (n < 10 ? '0' + n : n + '');
  return ({ mm, ss, ms }) => `${format(mm)}:${format(ss)}:${format(ms)}`;
})();

const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState({ mm: 0, ss: 0, ms: 0 });
  const [laps, setLaps] = useState([]);

  // elapsedTime을 업데이트한다.
  const updateElapsedTime = () => {
    // functional update
    setElapsedTime(({ mm, ss, ms }) => {
      ms += 1;
      if (ms >= 100) {
        ss += 1;
        ms = 0;
      }
      if (ss >= 60) {
        mm += 1;
        ss = 0;
      }

      return { mm, ss, ms };
    });
  };

  /*
  useEffect(effect: cleanup)
  - effect: 컴포넌트의 모든 렌더링이 완료된 후 매번 호출된다.
    (effect는 렌더링(페인팅까지)이 완료된 후 호출되므로 뷰가 렌더딩되는 것을 방해하지 않는다. 따라서 빠르게 렌더링된다.)
    effect는 함수 컴포넌트가 종료한 후에 호출되는 클로저로 렌더링 당시, 즉 함수 컴포넌트가 호출될 당시의 props와 state를 기억한다.
    (이는 함수 컴포넌트 내에서 정의한 이벤트 핸들러도 마찬가지다.)
  - cleanup: 컴포넌트가 리렌더링된 후 그리고 컴포넌트가 제거(unmount)되기 전 매번 호출된다.
  - [Rendering => effect()] => [Re-rendring => cleanup() => effect()] => ...=> [cleanup() => Unmount]

  useEffect(effect: cleanup, [])
  - effect: 컴포넌트의 첫 렌더링이 완료된 후 한번만 호출된다. 즉, 리렌더링 시에는 호출되지 않는다.
  - cleanup: 컴포넌트가 제거(unmount)되기 전 한번만 호출된다. 즉, 리렌더링 시에는 호출되지 않는다.
  - [Rendering => effect()] => [cleanup() => Unmount]

  예를 들어 다음 예제의 경우
  effect는 첫 렌더링이 완료된 후 한번만 호출된다. 이때 주의할 것은 setInterval의 콜백도 한번만 생성되는 클로저다.
  따라서 count는 언제나 0이므로 setCount(count + 1)이 1초마다 호출되도 count가 증가되지 않는다.
  cleanup은 컴포넌트가 제거(unmount)되기 전 한번만 호출된다. 따라서 count가 변경되어 리렌더링되어도 호출되지 않는다.
  function Count() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const id = setInterval(() => {
        setCount(count + 1);
      }, 1000);
      return () => clearInterval(id);
    }, []);

    return <h1>{count}</h1>;
  }

  useEffect(effect: cleanup, [deps])
  - effect: 컴포넌트의 첫 렌더링이 완료된 후 그리고 deps가 변경되어 컴포넌트가 리렌더링된 후 호출된다.
    deps 이외의 상태가 변경되어 컴포넌트가 리렌더링되어도 호출되지 않는다.
  - cleanup: deps가 변경되어 컴포넌트가 리렌더링된 후 그리고 컴포넌트가 제거(unmount)되기 전 호출된다.
    deps 이외의 상태가 변경되어 컴포넌트가 리렌더링되어도 호출되지 않는다.
  - [Rendering => effect()] => [dep 변경 => Re-rendring => cleanup() => effect()] => ...=> [cleanup() => Unmount]

  예를 들어 다음 예제의 경우
  effect는 첫 렌더링이 완료된 후 그리고 count가 변경되어 컴포넌트가 리렌더링된 후 호출되고
  cleanup은 count가 변경되어 컴포넌트가 리렌더링된 후 매번 호출된다.
  따라서 count 상태가 변경될 때마다 타이머가 해제되고 다시 설정되기를 반복한다.

  function Count() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const id = setInterval(() => {
        setCount(count + 1);
      }, 1000);
      return () => clearInterval(id);
    }, [count]);

    return <h1>{count}</h1>;
  }

  count 상태를 함수형 업데이트(functional update)로 변경하면 useEffect의 의존성으로 count를 설정하지 않아도 된다.
  이 경우 타이머는 첫 렌더링 후 한번 설정되고 언마운트되기 전 한번 해제된다.

  function Count() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const id = setInterval(() => {
        // functional update
        setCount(count => count + 1);
      }, 1000);
      return () => clearInterval(id);
    }, []);

    return <h1>{count}</h1>;
  }

  useEffect에 대한 자세한 내용은 다음을 참고하자.
  [번역]useEffect 완벽 가이드: https://rinae.dev/posts/a-complete-guide-to-useeffect-ko
  */

  /*
  useEffect의 effect 함수는 컴포넌트의 첫 렌더링이 완료된 후 그리고 isRunning 상태가 변경되어 컴포넌트의 리랜더링이 완료된 후 호출된다.
  useEffect의 cleanup 함수는 isRunning 상태가 변경되어 리랜더링된 후 호출된다.
  [Rendering => effect()] => [isRunning 변경 => Re-rendring => cleanup() => effect()] => ...=> [cleanup() => Unmount]
  */
  useEffect(() => {
    let timerId = null;

    // isRunning 상태가 false에서 true로 변경(Stop => Start)되면 10ms에 한번씩 ms를 1 증가시킨다.
    if (isRunning) timerId = setInterval(updateElapsedTime, 10);

    // cleanup 함수는 isRunning 상태가 변경되어 리랜더링된 후 호출된다.
    return () => {
      clearInterval(timerId);
    };
  }, [isRunning]);

  // elapsedTime과 laps를 초기화한다.
  // reset은 isRunning이 false인 경우에만 호출된다.
  const reset = () => {
    setElapsedTime({ mm: 0, ss: 0, ms: 0 });
    setLaps([]);
  };

  // elapsedTime을 laps에 추가한다.
  // addLap은 isRunning이 true인 경우에만 호출된다.
  const addLap = () => setLaps([...laps, elapsedTime]);

  // { mm, ss, ms } 형식의 elapsedTime과 laps 배열의 요소를 '00:00:00' 형식의 문자열로 변환하여 반환한다.
  return {
    isRunning,
    elapsedTime: formatElapsedTime(elapsedTime),
    laps: laps.map(lap => formatElapsedTime(lap)),
    setIsRunning,
    addLap,
    reset
  };
};

export default useStopwatch;
