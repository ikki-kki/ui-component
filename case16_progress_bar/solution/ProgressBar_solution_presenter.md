## Case16 : ProgressBar - 출제자 해설

### q1. vanilla.js 로 코드를 작성해보세요.

#### A)

- css 사용없이 vanilla.js animation 처리 하기
- setInterval 함수의 이해


#### 해설

> 이전으로 상태바이동

```js
ProgressBar.prototype.movePrev = function(){
  // ... 이전 생랙

  var intervalId = setInterval(frame, this.intervalSpeed );

  var elem = this.targetElement;

  function frame() {
    if ( start <= end ) {
      clearInterval(intervalId);
    } else {
      start--;
      elem.style.width = start + "%";
    }
  }

```
- frame 함수를 호출한다
- 시작지점의 길이가 끝지점의 길이보다 작으면 setInterval 해제
- 그밖에 지속적으로 감소

> 다음으로 이동

```js
function frame() {
  if ( start >= end ) {
    clearInterval(intervalId);
  } else {
    start++;
    elem.style.width = start + "%";
  }
}
```
- 도착지점보다 길면 인터벌 해제
- 그밖에는 지속적으로 길이 감소


### q2. jQuery 로 코드를 작성해보세요.  

#### A) 중점포인트

- jQuery animate 의 이해


#### 해설
> 이전으로 가기 클릭시
```js
$('#prev').click(function(){

  if( current  == 0 ) return;

  current--;

  $(".progress-bar > span").animate({
      width: 25 * current + '%'
  }, 500);

});
```
- 25%씩 줄어든 길이를 입력해 놓으면 해당 지점까지 애니메이션을 보여주며 이동한다.
- 500은 애니메이션 스피드
- 다음으로 이동하기도 늘어난 길이를 입력한다.

### q3. React 로 코드를 작성해보세요.


#### A)

- 애니메이션이 진행되는동안 이벤트 작동 안되게 처리
- useRef 활용

#### 해설

> src/App.js

```js
const isLoading = useRef(false);

```  
- 애니메이션이 진행되는지 체크
- 컴포넌트가 리랜더링되더라도 유지

> 애니메이션 딜레이 체크 하는 함수
```js
const delay = ( delay ) => {
  isLoading.current = true;
  return new Promise( () => 
    setTimeout( 
      () => isLoading.current = false
      , delay ) 
  );
}
```
- true로 설정
- params 로 받은 delay 시간뒤에 false로 바꾼다.
- await 로 처리하기 위해 Promise 를 리턴한다.

> 다음으로 이동
```js
const handleNext = async() => {

  if( isLoading.current ) return;
  if( current  === limit ) return;
  setCurrent( current + 1 );
  await delay(animationSpeed);

}
```
- 애니메이션이 진행중이면 함수 종료
- 마지막 까지 다차면 종료
- 그게 아니면 스텝 증가
- delay 를 실행한다.

> 이전으로 이동
```js
if( isLoading.current ) return;
if( current  === 0 ) return;
```
- 함수 종료 조건 : 애니메이션 중인가 or progressbar 가 처음
- 이하 다음으로 이동과 동일
