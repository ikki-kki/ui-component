## Case2 : ScrollSpy - 대기업 S사 프론트엔드 개발자님의 답안

### q1. 문제 상황에 대하여 Java Script로 동작을 구현시킬 수 있는 코드를 작성해보세요

#### A)

```js
// index.js
/**
 * [!] 기존에 이미 답안이 작성되어 있어 다른 방법으로 구현
 * 보여지는 영역에 따라 버튼 활성
 */
const activeButtonEls = document.querySelectorAll("#nav > li")
let latestActiveButtonEl = activeButtonEls[0];

const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const {
      isIntersecting,
      boundingClientRect
    } = entry;
    /**
     * 페이지의 현재 스크롤 위치
     */
    const scrollTop = window.pageYOffset;
    /**
     * Intersection 이벤트 발생한 요소의 높이 값
     */
    const { height } = boundingClientRect;

    if (isIntersecting) {
      /**
       * 스크롤 위치 / 요소의 높이 = 반올림 ⇒ 현재 요소의 위치
       */
      const index = Math.round(scrollTop / height);
      const activeButtonEl = activeButtonEls[index];
      /**
       * 마지막 활성된 버튼에서 `on` 클래스를 제거
       */
      latestActiveButtonEl.classList.remove('on');
      /**
       * 현재 보여지는 요소와 동일한 순번에 있는 버튼에 `on` 클래스 추가
       */
      activeButtonEl.classList.add('on');
      /**
       * 현재 활성된 버튼 요소를 `latestActiveButtonEl`에다 저장
       */
      latestActiveButtonEl = activeButtonEl;
    }
  })
}, {
  /**
   * 화면에 해당 요소가 50% 이상 보여지면 Intersection 이벤트 발생
   */
  threshold: .5
});

/**
 * `content` 하위 `div` 요소들을 Intersection 감시 요소로 등록
 */
document.querySelectorAll('#contents > div').forEach((contentEl) => {
  intersectionObserver.observe(contentEl);
});;

```

##### 해설
- IntersectionOverserver를 이용하여 화면에 해당 요소가 보여지는 타이밍에 이벤트를 실행하여 효율적으로 버튼활성 처리 할 수 있습니다.

##### 참고자료
- https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API



### q2. resize에 무관하게 동작하게끔 처리해보자

#### A)
```js
[문제 1 풀이와 동일합니다. :)]
```
##### 해설
- 스크롤이 발생되는 시점에 요소의 높이, window 스크롤 위치를 구하기 때문에 화면 사이즈 변경과 무관하게 잘 동작합니다.


### q3. resize listener를 적용해서 구현해보자.

#### A)
```js
[문제 1, 2 풀이와 동일합니다. :)]
```
### 해설
* 스크롤이 발생되는 시점에 요소의 높이, window 스크롤 위치를 구하기 때문에 화면 사이즈 변경과 무관하게 잘 동작합니다.




### q4. throttle로 처리

#### A)

```js
// util.js
export const throttle = (func, ms) => {
  let latestExecuteTime = 0;
  let debounceFn = debounce(fn, ms);
  return (args) => {
    if (latestExecuteTime + ms < Date.now()) {
      func(...args);
    } else {
      debounceFn(...args);
    }
  }
};
```


##### 해설
- 이벤트가 연속하여 발생하는 경우 `throttle`, `debounce`를 이용하여 불필요한 처리를 제한하여 성능을 향상 시킬수 있습니다.

##### 팁
- `throttle`, `debounce` 동작원리와 차이를 잘 알아두었다가 적절하게 활용하면 좋을것 같습니다.
  - [Throttle 와 Debounce 개념 정리하기](https://iill.in/fmjtge8 )



### q5. intersection Observer 활용

#### A)
```js
// App.js
...

const scrollSpyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const {
        isIntersecting,
        boundingClientRect
      } = entry;
      /**
       * 페이지의 현재 스크롤 위치
       */
      const scrollTop = window.pageYOffset;
      /**
       * Intersection 이벤트 발생한 요소의 높이 값
       */
      const { height } = boundingClientRect;

      if (isIntersecting) {
        /**
         * 스크롤 위치 / 요소의 높이 = 반올림 ⇒ 현재 요소의 위치
         */
        const index = Math.round(scrollTop / height);
        const activeButtonEl = activeButtonEls[index];
        /**
         * 마지막 활성된 버튼에서 `on` 클래스를 제거
         */
        latestActiveButtonEl.classList.remove('on');
        /**
         * 현재 보여지는 요소와 동일한 순번에 있는 버튼에 `on` 클래스 추가
         */
        activeButtonEl.classList.add('on');
        /**
         * 현재 활성된 버튼 요소를 `latestActiveButtonEl`에다 저장
         */
        latestActiveButtonEl = activeButtonEl;
      }
    })
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  }
);

...

```
##### 해설
- IntersectionOverserver를 이용하여 화면에 해당 요소가 보여지는 타이밍에 이벤트를 실행하여 효율적으로 버튼활성 처리 할 수 있습니다.

##### 결론
- Intersection Observer를 이용하면 스크롤 이벤트를 이용하지 않고 간단히 해결이 가능하고, 스크롤 이벤트를 이용하는것 보다 좋은 성능을 낼 수 있습니다.