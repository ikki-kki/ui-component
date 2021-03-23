## Case19 : ScrollTop - 출제자 해설

### q1. Javascript - 스크롤을 다시 올릴 경우 변경된 상태를 유지하다가 더 이상 올릴 수 없을 때(최상단에 스크롤이 위치할 때) 이전 상태로 변경

#### A)

- 스크롤 다운은 배경과 폰트 색상 변경 / 스크롤 업은 변경 상태를 유지하닥 더 이상 올릴 수 없을 때(최상단에 스크롤이 위치할 때) 최초 상태로 변경
- 스크롤 동작을 감지하기 위해서는 window 객체 또는 document 객체에 addEventListener를 사용하여 스크롤 이벤트를 추가합니다. 스크롤 이벤트는 지금 스크롤 중인지 아닌지를 감지하게 됩니다. 

##### 해설

```js
// window 객체
window.addEventListener('scroll', function() {
 console.log(‘scrolling’);
})

// or

window.onscroll = function() {……}

// document 객체
document.addEventListener('scroll', function() {……})

```
- 만약 특정 영역 안에서 스크롤 이벤트를 적용하고 싶다면 아래와 같이 변경합니다. 

```js
// 선택자로 특정 영역을 가리킨 후 스크롤 이벤트 추가
const section1 = document.querySelector('#section-1');

section1.addEventListener('scroll', function() {……})
```

- 다음 스크롤 위치를 가져오는 코드를 추가합니다. 이 때 크로스 브라우징을 고려해서 복수의 코드를 입력해야 합니다. 각 코드가 지원하는 브라우저는 아래 표에서 확인할 수 있습니다. 

```js
// window 객체
window.addEventListener('scroll', function() {
 const top = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
})
```
![example_image](./image.jpg)

- 스크롤 특정 위치를 가져올 수 있게 되었다면 조건문 또는 삼항 연산자를 사용하여 참일 경우에는 active 클래스를 추가하고 거짓을 경우에는 제거해주는 코드를 작성합니다.

```js
// window 객체
window.addEventListener('scroll', function() {
 const top = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
 (top >= 50 )
 ? nav.classList.add('active')
 : nav.classList.remove(‘active');
})
```





### q2. Javascript - 스크롤을 다시 올릴 경우 곧바로 배경/폰트 색상을 이전 상태로 변경

#### A)

```js
let oldValue = 0;
window.addEventListener('scroll', function(e){
 const newValue = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
 // 음수는 스크롤 다운, 양수는 스크롤 업
 if(oldValue - newValue < 0) nav.classList.add('active');
 if(oldValue - newValue > 0) nav.classList.remove('active');
 // 기준 값을 변경 값으로 치환
 oldValue = newValue;
});
```

##### 해설
- 스크롤 다운은 배경과 폰트 색상 변경 / 스크롤 업은 이전 상태로 변경
- 최초 기준 값을 설정한 후 기준 값 - 변경 값을 연산하여 스크롤 다운 / 스크롤 업 상태를 판단할 수 있습니다.
- 기준 값 - 변경 값 연산이 음수면 스크롤 다운, 양수면 스크롤 업입니다.
- 기준 값은 항상 변경 값으로 치환하여 새롭게 갱신을 해야 합니다.



### q3. Javascript - 자바스크립트에서 제공하는 마우수 휠 이벤트 동작 감지 기능을 사용해서 구현

#### A)

```js
window.addEventListener('wheel', mouseWheelEvent);
window.addEventListener('DOMMouseScroll', mouseWheelEvent);

function mouseWheelEvent(e) {
 const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
 (delta < 0)
 ? nav.classList.add('active')
 : nav.classList.remove('active');
}

// or

const isFireFox = (navigator.userAgent.indexOf('Firefox') !== -1);
const wheelEvt = isFireFox ? 'DOMMouseScroll' : 'wheel';

window.addEventListener(wheelEvt, mouseWheelEvent);

function mouseWheelEvent(e) {
 const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
 (delta < 0)
 ? nav.classList.add('active')
 : nav.classList.remove('active');
}

```

##### 해설
- 자바스크립트에서는 마우스 휠 방향을 알 수 있는 mousewheel, wheel, DOMMouseScroll 이벤트를 제공합니다.
- mousewheel은 비표준으로, wheel을 사용해야 합니다.
- 파이어폭스에서는 DOMMouseScroll을 사용해야 합니다.



### q4. Jquery - 스크롤을 다시 올릴 경우 변경된 상태를 유지하다가 더 이상 올릴 수 없을 때(최상단에 스크롤이 위치할 때) 이전 상태로 변경

#### A)

```js
$(window).scroll(function () {
 const $top = $(this).scrollTop();

 ($top >= 50 )
 ? $nav.addClass('active')
 : $nav.removeClass('active');
});
```

##### 해설
- 스크롤 다운은 배경과 폰트 색상 변경 / 스크롤 업은 변경 상태를 유지하닥 더 이상 올릴 수 없을 때(최상단에 스크롤이 위치할 때) 최초 상태로 변경
- scrollTop()는 제이쿼리에서 스크롤의 위치를 가져올 때 사용되는 메서드입니다. 이를 사용하면 자바스크립트 구현 방법 1과 동일한 방식으로 구현할 수 있습니다.


### q5. Jquery - 스크롤을 다시 올릴 경우 곧바로 배경/폰트 색상을 이전 상태로 변경

#### A)

```js
$(window).on('mousewheel DOMMouseScroll', function(e) {
 const delta = e.originalEvent.wheelDelta
 ? e.originalEvent.wheelDelta
 : -e.originalEvent.detail;

 (delta < 0)
 ? $nav.addClass('active')
 : $nav.removeClass('active');
});

```

##### 해설
- 스크롤 다운은 배경과 폰트 색상 변경 / 스크롤 업은 이전 상태로 변경
- 제이쿼리에서도 마우스 휠 이벤트를 적용할 수 있습니다.
- originalEvent : 제이쿼리의 이벤트 객체에서 지원하지 않는 브라우저 기능을 활용하고자 할 때 사용되는 이벤트 객체