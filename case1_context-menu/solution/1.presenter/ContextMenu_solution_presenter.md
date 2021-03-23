## Case1 : ContextMenu - 출제자 해설

### q1. 문제 상황에 대하여 Java Script로 동작을 구현시킬 수 있는 코드를 작성해보세요
- 이벤트 핸들러는 가급적 최소한으로만 활용할 것. 감시대상이 늘 수록 성능에 좋지 않다.
- 이벤트 캡쳐링/버블링을 이해하고 있는지
- stopPropagation과 preventDefault를 구분하여 사용할 수 있는지
- (추가로 생각해볼 문제) click 이벤트의 감시 대상을 더욱 줄일 수는 없을까?

#### A)

```css
.item.open .context {
  display: block;
}
```

```js
// 초보자의 접근법

const items = document.querySelectorAll('.item');
items.forEach(function(item) {
  item.addEventListener('click', function(e) {
    item.classList.toggle('open');
    items.forEach(function(elem) {
      if (elem !== item) elem.classList.remove('open');
    });
  });
});
```

```js
// 더 나은 방법 1
const wrapper = document.querySelector('.wrapper');
const items = document.querySelectorAll('.item');

wrapper.addEventListener('click', function(e){
  const targetElem = e.target;
  e.stopPropagation();
  if (!targetElem.classList.contains('item')) return;
  
  targetElem.classList.toggle('open');
  items.forEach(cont => {
    if(cont !== targetElem) cont.classList.remove('open');
  });
});

document.body.addEventListener('click', function(e) {
  if (e.target.classList.contains('context')) return;
  items.forEach(cont => {
    cont.classList.remove('open');
  });
});
```

```js
// 더 나은 방법 (2)
const wrapper = document.querySelector('.wrapper');
const items = document.querySelectorAll('.item');

document.body.addEventListener('click', function(e) {
  const targetClassList = e.target.classList;
  if (targetClassList.contains('context')) return;
  if (targetClassList.contains('item')) {
    targetClassList.toggle('open');
    items.forEach(function(elem) {
      if (elem !== e.target) elem.classList.remove('open');
    });
    return;
  }
  items.forEach(function(elem) {
    elem.classList.remove('open');
  });
});
```


##### 해설

- 초보자들은 DOM 제어와 관련하여 이벤트 리스너를 잔뜩 작성하곤 한다. 목록의 각 아이템 하나하나마다 등록하는 식이다. 본 문제의 경우를 예로 들면 다음과 같이.

```js
items.forEach(function(item) {
  item.addEventListener(‘click’, …)
}
```

이렇게 작성하면 크게 두가지 문제가 있다. 

(1) 이벤트 감시대상이 많은 만큼 메모리에 부담이 된다. 
(2) 어떤 변경에 의해 목록에 아이템이 추가될 경우 해당 아이템은 감시대상에 속하지 않아 팝오버 동작이 이뤄지지 않는다. 

따라서 새로운 아이템이 추가될 때마다 그에 대한 리스너를 등록해주어야 한다.

반면 리스너를 상위 노드에 등록하면 위 두가지 문제가 모두 해결된다. 따라서 리스너 등록은 최소화하는 것이 바람직하다. 이벤트 핸들러를 최소화하기 위해서는 캡쳐링/버블링을 이해하는 것이 필요하다. 나아가 리스너 함수의 첫번째 인자인 event 객체의 내부에 어떤 정보가 들어있는지를 알 필요가 있다.

- stopPropagation과 preventDefault를 구분하여 사용할 수 있는지도 중요한 요소


##### (추가로 생각해볼 문제) 

- click 이벤트의 감시 대상을 더욱 줄일 수는 없을까? 그럴 경우의 장단점은?

장점: 리스너가 줄어듦.
단점: 1) 함수 내부에 등장할수밖에 없는 조건문에 대한 최적화 필요.
      2) 개별 등록/해제 가능한 리스너에 비해 관리가 어려움




### q2. 문제 상황에 대하여 jquery로 동작을 구현시킬 수 있는 코드를 작성해보세요
- javascript와 사실상 같은 구조.
- jquery의 ‘delegate target’에 대한 이해가 필요하다.
- 상황에 꼭 맞는 메서드들을 알고 있는지가 관건.


#### A)

```js
const $wrapper = $('.wrapper');
const $items = $wrapper.find('.item');
$wrapper.on('click', '.item', function(e) {
  e.stopPropagation();
  $(this).toggleClass('open').siblings().removeClass('open');
});
$('body').on('click', function(e) {
  $items.removeClass('open');
});
```

```css
.item.open .context {
  display: block;
}
```

##### (추가로 생각해볼 문제) 

- 마찬가지로 이벤트 감시 대상을 줄일 방법은 없을지?
```js
const $items = $('.wrapper .item');
$('body').on('click', e => {
  const item = $(e.target);
  if (item.is('.item')) {
    item.toggleClass('open').siblings().removeClass('open');
  } else {
    $items.removeClass('open');
  }
});
```




### q3. 문제 상황에 대하여 HTML(detail 태그)-JavaScript로 동작을 구현시킬 수 있는 코드를 작성해보세요
- HTML5의 details 태그를 활용하면 팝오버 오픈을 위한 처리를 자바스크립트가 관여하지 않아도 되므로 코드가 훨씬 간결해진다.

#### A)

```css
/* css */
details[open] p {
  display: block;
}
```

```js
const items = document.querySelectorAll('details');
document.body.addEventListener('click', function(e) {
  if (e.target.nodeName !== 'P' && e.target.nodeName !== 'SUMMARY') {
    items.forEach(function(item) {
      item.removeAttribute('open');
    });
    return;
  }
  items.forEach(function(item) {
    if (item !== e.target.parentElement) {
      item.removeAttribute('open');
    }
  });
});
```


### q4. 문제 상황에 대하여 React로 동작을 구현시킬 수 있는 코드를 작성해보세요

#### A)

```js
const togglePopover = index => e => {
  e.preventDefault();
  e.stopPropagation();
  setOpen(openedIndex === index ? null : index);
};

const closeAll = e => {
  if (e.target.nodeName !== 'P') setOpen(null);
};
```

### q5. 문제 상황에 대하여 React-CreatePortal 기능으로 동작을 구현시킬 수 있는 코드를 작성해보세요
- createPortal은 Modal, Popover 등 floating UI를 효과적으로 제어할 수 있는 강력한 도구다. 

#### A)

```js
<ContextPortal
  target={detailRefs.current[openedIndex]}
  children={<p>{dummyData[openedIndex]?.context}</p>}
/>
```


### 결론 - 장단점 비교

- html / css로 처리할 방법이 있다면 최대한 활용하는 것이 좋다.
1) 자바스크립트가 관여하지 못하는 경우에도 완결성 있는 화면을 보여줄 수 있다.
2) 개발자가 온갖 상황을 테스트하며 일일이 대응하여 작성한 코드보다 이미 브라우저에서 검증이 완료된 html / css의 기본 동작의 신뢰도가 높을 수밖에 없다.
3) 무엇보다 코드량이 줄어든다. simple is the best.

- 노출하지 않는 데이터를 html에 계속 보유하고 있는 것이 좋을까, 그렇지 않고 필요할 때만 그리는 편이 좋을까?
> 어느 경우에도 리페인트는 피할 수 없으니 논외. 리플로우는 position: absolute로 이미 최소화되어 있는 상태. 그렇다면 이미 만들어진 노드를 그대로 사용하는 것과 추가하는 것 중 어느 쪽이 빠를까가 관건인데, 모던브라우저에서 속도 차이는 거의 없다고 봐도 무방하다.
> 팝오버 안의 내용이 민감한 정보라거나, 매 번 오픈할 때마다 서버로부터 실시간 정보를 반영해야 하는 경우라면 선택의 여지가 없겠으나, 그렇지 않은 경우라면 개발의 편리성을 고려하는 것으로 충분하겠다.





