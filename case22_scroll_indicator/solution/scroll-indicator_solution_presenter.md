## Case22 : ScrollIndicator - 출제자 해설

### q1. JavaScript로 해당 기능을 구현하시오 - scrollBar의 width값 변경

#### A)
```js
const scrollBar = document.getElementById('scroll-bar');

window.addEventListener('scroll', function () {
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
  const clientHeight = document.body.clientHeight || document.documentElement.clientHeight;

  // contentHeight : 눈에 보이지 않는 남은 범위
  const contentHeight = scrollHeight - clientHeight;
  const percent = (scrollTop / contentHeight) * 100;
  
  scrollBar.style.width = percent + '%';
})
```

- document.documentElement.scrollHeight, document.body.scrollHeight : 전체 문서의 높이
- document.documentElement.clientHeight, document.body.clientHeight : 현재 눈에 보이는 브라우저의 높이


### q2. JavaScript로 해당 기능을 구현하시오 - translateX

#### A)
- scrollBar의 width 값을 100%로 변경한 다음 최초 위치를 화면 왼쪽 영역 바깥으로 이동
- 스크롤 시 translateX를 사용하여 scrollBar 위치를 변경

```js
const scrollBar = document.getElementById('scroll-bar');

window.addEventListener('scroll', function () {
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
  const clientHeight = document.body.clientHeight || document.documentElement.clientHeight;

  const contentHeight = scrollHeight - clientHeight;
  const percent = (scrollTop / contentHeight) * 100;

  scrollBar.style.transition = 'transform 0.3s ease-out';
  scrollBar.style.transform = `translateX(-${100 - percent}%)`;
})
```

```css
#scroll-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: blue;

  width: 100%;
  transform: translateX(-100%);
}
```