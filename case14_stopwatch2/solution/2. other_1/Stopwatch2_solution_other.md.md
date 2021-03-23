## Case14 : Stopwatch - 대기업 S사 프론트엔드 개발자님의 답안

### q1. vanilla.js 로 코드를 작성해보세요.

#### A)

```js
// solution/2.others_1/q1_js/index.js
function Timer() {
    /**
     * 타이머 진행 시간(초)
     */
    this.seconds = 0;
    /**
     * Pause 여부
     */
    this.isPause = false;
    /**
     * `intervalId` 아이디
     */
    this.intervalId;
    /**
     * 타이머가 업데이트 됐을때 콜백
     */
    this.updateCallbackFn;
}

Timer.prototype.start = function () {
    const { intervalId } = this;
    if (intervalId) {
        clearInterval(intervalId);
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
     */
    this.intervalId = setInterval(() => {
        const { seconds } = this;
        this.setTimer(seconds + 1);
    }, 1000);
};

Timer.prototype.pause = function () {
    if (this.intervalId) {
        clearInterval(this.intervalId);
    }
};

Timer.prototype.reset = function () {
    this.pause();
    this.setTimer(0);
};

Timer.prototype.setUpdateCallback = function (callbackFn) {
    this.updateCallbackFn = callbackFn;
}

Timer.prototype.setTimer = function (seconds) {
    const { updateCallbackFn } = this;
    this.seconds = seconds;
    if (typeof updateCallbackFn === 'function') {
        updateCallbackFn(this.seconds);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const minEl = document.querySelector('#min');
    const secEl = document.querySelector('#sec');

    const seconds = new Timer();
    seconds.setUpdateCallback((seconds) => {
        let min = Math.floor(seconds / 60);
        min = 10 > min ? '0' + min : min;
        let sec = seconds % 60;
        sec = 10 > sec ? '0' + sec : sec;
        /**
         * 타이머 업데이트
         */
        minEl.textContent = min;
        secEl.textContent = sec;
    })

    document.querySelector('#start').addEventListener('click', function () {
        seconds.start();
    });

    document.querySelector('#pause').addEventListener('click', function () {
        seconds.pause();
    });

    document.querySelector('#reset').addEventListener('click', function () {
        seconds.reset();
    });
});
```

##### 해설
- 기존 Timer를 인스턴스 생성 가능한 함수로 구현하여 개발
  - 여러개의 인스턴스를 생성하여 동시에 여러 타이머를 만들수 있음
  - 타이머 메소드 네이밍 변경, 이미 객체(인스턴스)는 타이머를 가르키기 때문에 메소드에 `Timer`가 포함되지 않도록 변경
  - 데이터와 랜더링 처리 로직을 완전히 분리하여 처리

##### 참고자료
- https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype



### q2. jQuery 로 코드를 작성해보세요.
#### A)

```js
// solution/2.others_1/q2_jquery/index.js
...

$(() => {
    const minEl = $('#min');
    const secEl = $('#sec');

    const seconds = new Timer();
    seconds.setUpdateCallback((seconds) => {
        let min = Math.floor(seconds / 60);
        min = 10 > min ? '0' + min : min;
        let sec = seconds % 60;
        sec = 10 > sec ? '0' + sec : sec;
        /**
         * 타이머 업데이트
         */
        minEl.text(min);
        secEl.text(sec);
    })

    $(document.body)
        /**
         * Jquery Event Delegation을 이용하여 `body`에서 이벤트를 위임받아 모든 버튼이벤트를 처리
        */
        .on('click', '#start, #pause, #reset', ({ target }) => {
            const id = target.getAttribute('id');
            switch (id) {
                case 'start':
                    seconds.start();
                    break;
                case 'pause':
                    seconds.pause();
                    break;
                case 'reset':
                    seconds.reset();
                    break;
            }
        });
})
```

##### 해설
- 1번 문제와 내용은 거의 동일하지만 이벤트 바인딩, DOM을 제어하기 위해 Jquery 라이브러리를 사용하였습니다.

##### 참고자료
- https://api.jquery.com/ready/
- https://api.jquery.com/on/
- https://api.jquery.com/text/


### q3. React 로 코드를 작성해보세요.
#### A)

```js
// solution/2.others_1/q3_react/src/App.js
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
  }, []);

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
```

##### 해설
- 화면 랜더링과 관련없는 `intervalId` 값은 `useRef`으로 처리하였습니다.
- 타이머에 의해 화면이 매번 랜더링 될때마다 `handle**` 함수가 재정으되는 불필요한 연산을 줄이기 위해 `useCallback`을 이용하여 캐싱하였습니다.
- `handle**` 함수내에서 상태를 업데이트 하기 위해서는 `seconds` 상태값을 직접 참조하는 대신 `setSeconds` 함수의 인자로 콜백을 실행하여 처리하였습니다(자세한 내용은 참고자료를 확인해 주세요).

##### 참고자료
- https://blog.sonim1.com/220
- https://ko.reactjs.org/docs/hooks-reference.html#usestate


##### 결론
- `setInterval` 그리고 `clearInterval`를 잘 이해하고 있다면 아주 쉽게 구현이 가능한 문제입니다!