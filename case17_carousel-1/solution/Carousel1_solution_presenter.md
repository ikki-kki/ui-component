## Case17 : Carousel 1 - 출제자 해설
  

### q1. vanilla.js 로 코드를 작성해보세요.

#### A) 

- 다음 슬라이드로 이동하는 시간(0.5초)동안 다음 슬라이드로 이동하면 안된다. 이전으로 가기 클릭시에도 동일하게 작동한다.
- 마지막 슬라이드(5)에서 다음 슬라이드로 클릭하면 첫번째로,  첫번째 슬라이드에서 이전 슬라이드로 이동 클릭하면 마지막 슬라이드로 간다.
- 슬라이드의 갯수를 늘리더라도 슬라이드 갯수만큼 작동해야 한다.
​

```js
function  Carousel( carouselElement ){

	this.carouselElement = carouselElement;

	this.itemClassName = "carousel_item";

	this.items = this.carouselElement.querySelectorAll('.carousel_item');

//.... 이하 생략

```
- .carousel_item 슬라이드 각 아이템을 설정한다. querySelectorAll


```js
Carousel.prototype.disableInteraction =	function(){

	this.isMoving = true;

	setTimeout( () => {

	this.isMoving = false

	}, 500);

}
```

슬라이드 클릭 시 isMoving 을 true 기본상태로,
0.5 초뒤 isMoving 을 false 로 바꾼다.
  

```js

Carousel.prototype.movePrev = function() {

  

	if (!this.isMoving) {
	

		if (this.current === 0) {

			this.current = (this.totalItems - 1);

		} else {

			this.current--;

		}	  

		this.moveCarouselTo();

	}

}
​
```

- 이전으로 가기 클릭시, isMoving 의 상태를 확인한다.
- 0 번째는 현재 위치가 첫번째 이므로, 마지막 슬라이드로 현재 위치를 변경한다,
- 그게 아니면 현재 위치를 감소 시킨다.

```js
Carousel.prototype.moveNext = function() {
	
	if (!this.isMoving) {

		if (this.current === (this.totalItems - 1)) {
			this.current = 0;

		} else {

			this.current++;

		}

		this.moveCarouselTo(); 

	}

}

```
- 다음으로 가기는 현재위치가 마지막 위치인지만 확인하면 된다( ex - this.totalItems - 1)
- 마지막 위치라면 다음 슬라이드는 처음(0) 으로 이동한다.
- 그밖의 상황은 슬라이드 위치를 증가시킨다.


```js
Carousel.prototype.moveCarouselTo = function() {

	// ... 이전 생략
	this.disableInteraction();

	var  prev = this.current - 1,
	next = this.current + 1;	  

	if (this.current === 0) {
		prev = (this.totalItems - 1);
	} else  if (this.current === (this.totalItems -1)) {
		next = 0;
	}
	
	//... 다음 설명 참조

}

```
- 이 함수는 슬라이드 이동을 완료하는 함수다.
-  현재 위치를 가지고, 이전과 이후 슬라이드를 셋팅한다.
-  현재위치가 0 번째인지와 마지막 인지를 체크한다.
- 현재위치가 0 이면 next는 현재위치 + 1
- 현재위치가 마지막 이면 next는 처음으로 간다.

> 인덱스를 반복문으로 돌리면서 
> 현재위치면 active
> 이전이면 prev
> 다음이면 next
> 를 붙인다.
> 그외에는 기본 클래스르 명만 붙인다.

```js
if ((this.totalItems - 1) > 3) {

	for(var  i=0 ; i<this.totalItems ; i++ ){
	
		if(i==this.current){
			this.items[i].className = this.itemClassName + " active";
		}else  if(i==prev){
			this.items[i].className = this.itemClassName + " prev";
		}else  if(i==next){
			this.items[i].className = this.itemClassName + " next";
		}else{
			this.items[i].className = this.itemClassName;
		}

	}
}
  
```

### q2. jQuery 로 코드를 작성해보세요.

#### A)

- querySelectorAll 을 jQuery로 셀렉터로 지정하기
- 클릭이벤트 jQuery 로 할당


#### 해설
-   하위 엘리먼트 설정
```js
$(셀렉터).children()
```

- 아래와 같이 클릭이벤트 설정
```js
this.prevButton = this.carouselElement.children('.carousel_button--prev');
this.prevButton.click(() => { ... }
```



### q3. React 로 코드를 작성해보세요.

#### A) 중점포인트

- 0.5 초 뒤에 isMoving 을 false 로 처리하기
- useState 훅으로 현재 슬라이드의 위치

#### 해설

> useRef 로 컴포넌트가 리랜더링 되더라도 변수를 유지

> src/Carousel.js

```js
const  isMoving = useRef(false);

useEffect(() => {

	isMoving.current = true;
	setTimeout(() => {
		isMoving.current = false;
	}, 500);
	
}, [current]);

```  
- isMoving.current 를 시작전에 true
- 0.5초뒤에 false 로 바꾼다.



> 다음 슬라이드로 가기

```js

const moveNext = () => {
  if(!isMoving.current){
    if (current === (totalItems-1)) {
      setCurrent(0);
    } else {
      setCurrent(current+1);
    }
  }
}
```

- isMoving.current 현재 슬라이드가 작동중인지 체크한다.
- if : 마지막 위치라면 첫번째 (0)로 이동
- else : 다음 슬라이드로 이동  

> 이전 슬라이드로 가기

```js
const movePrev = () => {
    
  if(!isMoving.current){
    if (current === 0) {
      setCurrent(totalItems - 1);
    } else {
      setCurrent(current-1);
    }
  }

}

```
- isMoving.current 현재 슬라이드가 작동중인지 체크한다.
- if : 첫번째 슬라이드라면 다음슬라이드는 마지막 슬라이드로
- else : 현재 슬라이드 위치 감소


> 버튼의 이전위치와 다음 위치를 설정해주어서 Button에 prev와 next boolean 값을 넘긴다.

```js
const prev = ((current) === 0 ? totalItems - 1 : current-1);
const next = (current === (totalItems-1) ) ? 0 : current+1;    
```

- prev : 현재위치가 0 이면 이전위치는 마지막 슬라이드 , 그밖은 -1
- next : 현재위치가 마지막이면 다음 위치는 0, 그밖은 +1

