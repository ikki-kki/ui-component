## Case19 : ScrollSpy - 대기업 S사 프론트엔드 개발자님의 답안

### q1. Javascript - 스크롤을 다시 올릴 경우 변경된 상태를 유지하다가 더 이상 올릴 수 없을 때(최상단에 스크롤이 위치할 때) 이전 상태로 변경

#### A)

```js
// main.js
const navEl = document.querySelector('nav');
const scrollThreshold = 50;
const debounceDelay = 10;

/**
 * 스크롤 이벤트가 연속적으로 발생하는 경우 성능저하를 방지하기 위해 `debounce` 유틸을 이용하여, 
 * 마지막 스크롤 이벤트가 발생하고 일정시간(debounceDelay=10ms) 이상 시간이 지연됐을때 이벤트 핸들러를 1회만 실행
 */
const handleDebounceScrollEvent = debounce(() => {
    const windowScrollY = window.scrollY;
    if (windowScrollY > scrollThreshold) {
        /**
         * 스크롤된 값이 임계값 보다 큰 경우 `nav` 엘리먼트에 `active` 클래스 추가
         */
        navEl.classList.add('active');
    } else {
        /**
         * 스크롤된 값이 임계값 보다 큰 경우 `nav` 엘리먼트에 `active` 클래스 제거
         */
        navEl.classList.remove('active');
    }
}, debounceDelay);

window.addEventListener('scroll', handleDebounceScrollEvent);
```

```js
// debounce.js
/**
 * 입력된 `func` 함수가 연속하여 호출되도 마지막으로 "함수가 호출된 시간 + `delay`" 시간이후에 1회만 실행
 * 
 * @param {function} func 
 * @param {number} delay 단위는 milliseconds 입니다.
 */
const debounce = (func, delay) => {
    /**
     * `setTimeout` 아이디를 저장
     */
    let procId = null;
    return (...args) => {
        if (procId) {
            /**
             * `procId`가 존재하면 실행되지 않도록 제거
             */
            window.clearTimeout(procId);
        }
        /**
         * `delay` 이후 해당 함수가 실행되도록 `setTimeout`에 태스크를 등록
         */
        procId = setTimeout(() => func(...args), delay);
    }
};
```

##### 해설
- 기본적인 접근 방법은 `window` 객체에 `scroll` 이벤트를 바인딩하고, 스크롤 이벤트가 발생할때 `window.scrollY` 값을 확인하여 클래스를 적용하는 것입니다.
- 스크롤 이벤트는 스크롤이 진행되는동안 짧은시간내 수십여번 실행될 수 있기 때문에 성능문제를 고려해야 하는데, 이러한 부부은 `debounce` 유틸을 구현하여 해결하였습니다.
- ✨ `debounce` 유틸은 `throttle`과 함께 개발시 자주 사용되는 라이브러리 입니다. 사용하는 방법과 원리를 익혀두시면 좋습니다.
    - @see https://www.npmjs.com/package/debounce



### q2. Javascript - 스크롤을 다시 올릴 경우 곧바로 배경/폰트 색상을 이전 상태로 변경

#### A)

```js
// main.js
const navEl = document.querySelector('nav');
const scrollThreshold = 50;
const throttleDelay = 100;

/**
 * 스크롤 이벤트가 연속적으로 발생하는 경우 성능저하를 방지하기 위해 `debounce` 유틸을 이용하여, 
 * 마지막 스크롤 이벤트가 발생하고 일정시간(throttle=100ms) 이상 시간이 지연됐을때 이벤트 핸들러를 1회만 실행
 */
let latestWindowScrollY = 0;
const handleThrottleScrollEvent = throttle(() => {
    const windowScrollY = window.scrollY;
    if (latestWindowScrollY - windowScrollY > 0) {
        navEl.classList.remove('active');
    } else {
        navEl.classList.add('active');
    }
    latestWindowScrollY = windowScrollY;
}, throttleDelay);

window.addEventListener('scroll', handleThrottleScrollEvent);
```

```js
// debounce.js
/**
 * 입력된 `func` 함수가 연속하여 호출되도 마지막으로 "함수가 호출된 시간 + `delay`" 시간이후에 1회만 실행
 * 
 * @param {function} func 
 * @param {number} delay 단위는 milliseconds 입니다.
 */
const debounce = (func, delay) => {
    /**
     * `setTimeout` 아이디를 저장
     */
    let procId = null;
    return (...args) => {
        if (procId) {
            /**
             * `procId`가 존재하면 실행되지 않도록 제거
             */
            window.clearTimeout(procId);
        }
        /**
         * `delay` 이후 해당 함수가 실행되도록 `setTimeout`에 태스크를 등록
         */
        procId = setTimeout(() => func(...args), delay);
    }
};
```


##### 해설
- 기본적인 접근 방법은 `window` 객체에 `scroll` 이벤트를 바인딩하고, 스크롤 이벤트가 발생할때 가장 마지막으로 실행된 스크롤 이벤트에서 `window.scrollY` 값을 `latestWindowScrollY` 변수에 저장하고
- `latestWindowScrollY` 변수에서 `window.scrollY` 값을 뺀 결과 값이 0보다 큰 경우 `active` 클래스를 부여, 그렇지 않은경우 제거하는 원리입니다.
- 스크롤 이벤트는 스크롤이 진행되는동안 짧은시간내 수십여번 실행될 수 있기 때문에 성능문제를 고려해야 하는데, 이러한 부부은 `throttle` 유틸을 구현하여 해결하였습니다.
- 이전에 구현했던 `debounce`와 다른점은, `throttle` 이벤트는 호출되는 즉시 실행이 된다는것 입니다. `debounce`와 `throttle`의 차이를 잘 알아두었다가 활용하면 좋습니다.
- ✨ `throttle` 유틸은 `debounce`과 함께 개발시 자주 사용되는 라이브러리 입니다. 사용하는 방법과 원리를 익혀두시면 좋습니다.
    - @see https://www.npmjs.com/package/lodash.throttle



### q3. Javascript - 자바스크립트에서 제공하는 마우수 휠 이벤트 동작 감지 기능을 사용해서 구현

#### A)

```js
// main.js
const scrollThreshold = 50;
const debounceDelay = 10;

/**
 * q1 문제와 동일한 방법으로 구현, Jquery에서 지원하는 함수를 응용하여 DOM을 제어
 */
const handleThrottleScrollEvent = debounce(() => {
    const windowScrollY = window.scrollY;
    if (scrollThreshold < windowScrollY) {
        $nav.addClass('active');
    } else {
        $nav.removeClass('active');
    }
    latestWindowScrollY = windowScrollY;
}, debounceDelay);

/**
 * [!] `mousewheel` 이벤트를 사용하는 경우 (마우스가 아닌)키보드 또는 스크린리더등으로 
 * 스크롤을 제어하는 경우 이벤트를 트리거 할 수 없음
 */
$(window).on('scroll', handleThrottleScrollEvent);
```

```js
// debounce.js
/**
 * 입력된 `func` 함수가 연속하여 호출되도 마지막으로 "함수가 호출된 시간 + `delay`" 시간이후에 1회만 실행
 * 
 * @param {function} func 
 * @param {number} delay 단위는 milliseconds 입니다.
 */
const debounce = (func, delay) => {
    /**
     * `setTimeout` 아이디를 저장
     */
    let procId = null;
    return (...args) => {
        if (procId) {
            /**
             * `procId`가 존재하면 실행되지 않도록 제거
             */
            window.clearTimeout(procId);
        }
        /**
         * `delay` 이후 해당 함수가 실행되도록 `setTimeout`에 태스크를 등록
         */
        procId = setTimeout(() => func(...args), delay);
    }
};
```

##### 해설
- 기본적인 접근 방법은 `q1` 문제와 동일합니다. `scroll` 이벤트와 `mousewheel` 이벤트 차이에 대해 알아두시면 도움이 될 것 같습니다.
- [!] `mousewheel` 이벤트를 사용하는 경우 (마우스가 아닌)키보드 또는 스크린리더등으로 스크롤을 제어하는 경우 이벤트를 트리거 할 수 없습니다. 주의하세요!



### q4. Jquery - 스크롤을 다시 올릴 경우 변경된 상태를 유지하다가 더 이상 올릴 수 없을 때(최상단에 스크롤이 위치할 때) 이전 상태로 변경

#### A)

```js
//main.js
const scrollThreshold = 50;
const throttleDelay = 250;
const debounceDelay = 100;

/**
 * q2 문제와 동일한 방법으로 구현, Jquery에서 지원하는 함수를 응용하여 DOM을 제어
 */
let latestWindowScrollY = 0;

const handleScrollEvent = () => {
    const windowScrollY = window.scrollY;
    if (latestWindowScrollY - windowScrollY > 0) {
        $nav.addClass('active');
    } else {
        $nav.removeClass('active');
    }
    latestWindowScrollY = windowScrollY;
};

const handleThrottleScrollEvent = throttle(handleScrollEvent, throttleDelay);

/**
 * `throttle`, `debounce` 모두 이용하여 이벤트를 바인딩 하였는데,
 * - 유저가 너무 빠른속도로 스크롤 방향을 바꾸는경우 `throttleDelay`에 의해 중간과정은 생략될 수 있으나 성능은 유지할 수 있음.
 */
$(window).on('scroll', handleThrottleScrollEvent)
```

##### 해설
- 기본적인 접근방법은 `q2`와 동일하나, `throttle`의 딜레이를 늘려 함수가 실행되는 횟수를 줄여 성능을 향상시켰습니다.


##### 결론
- 스크롤 이벤트에 대한 기본 적인원리를 알면 구현이 가능하나, `debounce`, `throttle` 유틸을 이해하고 활용하면 좋은 성능의 코드를 만들 수 있습니다.