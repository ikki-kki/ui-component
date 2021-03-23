## Case14 : Stopwatch - 출제자 해설

### q1. vanilla.js 로 코드를 작성해보세요.

> 중점포인트
- setInterval , setTimeout 의 이해도를 체크한다.
- setTimeout 을 사용할시
* 재귀호출로 처리한다
* 첫번째 함수를 전역으로 함에 유의한다.

#### A)

Timer 객체를 만든다.

> Timer 객체를 만드는 이유는 시작 버튼 클릭시 아래와 같이 한줄로 가독성 좋게 이벤트를 만들기 위함이다.

```js
Timer.startTimer();
```

- 기본 변수는 아래와 같다.

```js
isPending :  true, // true 면 멈춤 false 면 진행
currentSec :  0, // 현재 초
currentMin :  0, // 현재 분
```

시작 버튼을 누를시

```js
startTimer :  function(){

if(!this.isPending){

this.currentSec+=1;

if(this.currentSec==60){

this.currentSec=0;

this.currentMin+=1;

}

document.querySelector('#min').innerHTML = ('0' + this.currentMin).slice(-2);

document.querySelector('#sec').innerHTML = ('0' + this.currentSec).slice(-2);

setTimeout("Timer.startTimer()", 1000);

}

},
```

재귀 호출을 진행하면서,
pending이 false 면 계속 진행
true 인 경우, 재귀 호출을 멈춘다.

```js
("0" + this.currentMin).slice(-2);
```

1초인경우 01 을 붙여주기 위함인데
12초면 012 이다.
이를 뒤에서부터 두자리 끊어서 12로 나타낸다.

```js
pauseTimer :  function(){

this.isPending = true;

},
resetTimer :  function(){

this.isPending = true;

this.currentSec = 0;

this.currentMin = 0;

document.querySelector('#min').innerHTML = "00";

document.querySelector('#sec').innerHTML = "00";

}
```

pauseTimer(멈춤) => isPending 을 false
resetTimer(리셋) => isPending 을 false 하고, 시계를 00:00 으로 초기화

```js
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#start").addEventListener("click", function () {
    if (Timer.isPending) {
      Timer.isPending = false;

      Timer.startTimer();
    }
  });

  document.querySelector("#pause").addEventListener("click", function () {
    Timer.pauseTimer();
  });

  document.querySelector("#reset").addEventListener("click", function () {
    Timer.resetTimer();
  });
});
```

DOMContentLoaded 문서가 로드되고
각 버튼을 클릭시 타이머의 객체의 함수를 콜한다.

> 시작을 누를시 if 로 체크하는 것은 두번 누르더라도 반복해서 증가함을 방지한다.
> 궁금하면 if 를 없애고 돌려본다.

```js
if (Timer.isPending) {
  Timer.isPending = false;

  Timer.startTimer();
}
```

##### (추가로 생각해볼 문제)

- setInterval 으로 처리 한다면 어떻게 할수 있을까 고민해본다.


### q2. jQuery 로 코드를 작성해보세요.

> 중점포인트

vanilia.js 와의 차이점
jQuery로 문서 로드 시점,
jQuery 이벤트 할당으로 처리 했는지

#### A)

> html 안에 텍스트 넣기

```js
$("#min").html("00");
```

```js
$(document).ready(function () {
  $("#start").click(function () {
    if (Timer.isPending) {
      Timer.isPending = false;

      Timer.startTimer();
    }
  });

  $("#pause").click(function () {
    Timer.pauseTimer();
  });

  $("#reset").click(function () {
    Timer.resetTimer();
  });
});
```

문서를 로드후에 각 click 이벤트를 할당한다.


### q3. React 로 코드를 작성해보세요.

> 중점포인트

- state의 값이 변화해서 랜더링이 되더라도 변수의 변화값을 유지하고 있는지
- useEffect 의 두번째 인자를 잘 이해하고 있는지
- useState 의 콜백 이해
- setInterval 을 React로 제어하는 방법


#### A) 

<순서>
시작, 중지를 누르면
pending 을 변화 시키고 -> useEffect 로 감지해서 타이머 진행 -> sec가 1씩 증가 -> useEffect 로 감지해서 화면 변화

```
const  intervalId = useRef(null)
```

- 컴포넌트가 랜더링 되더라도 변화하는 값을 저장하기 해서 useRef 로 처리한다.
- useRef 는 현재 상태 값을 intervalId.current 처럼 current 값으로 처리한다.
- 해당 useRef 가 궁금하면 console.log(intervalId) 로 찍어본다.
  > 아래와 같이 intervalId.current 로 setInterval 의 값을 저장하고, clearInterval 로 해제한다.

```js
useEffect(() => {
  if (!pending) {
    intervalId.current = setInterval(() => setSec((sec) => sec + 1), 1000);
  } else {
    clearInterval(intervalId.current);
  }
}, [pending]);
```

- 타이머의 제어는 pending의 상태로 분기해서 처리한다.
- pending : false => 타이머 진행
- pending : true => 타이머 멈춤
- pending 의 상태가 변화 하면 useEffect 로 감지하는데 두번째 인자로 체크한다.
- 하나의 상태가 변화하는 것을 감지해서 위와 같이 [pending]으로 ​ 처리한다.
  > 아래와 같이 여러개의 상태를 useEffect 로 감지해서 처리하지 않는다.

```js
useEffect(() => {
  setSec(0);
  setMin(0);
});
```

```js
useEffect(() => {
  if (sec === 60) {
    setSec(0);
    setMin((min) => min + 1);
  }
}, [sec]);
```

- sec 의 변화를 감지하는데, 60초가 되면 분1증가 초는 0으로 초기화
  ​

##### (추가로 생각해볼 문제)

- setTimeout 으로 처리 한다면 어떻게 할수 있을까 고민해본다.

​
