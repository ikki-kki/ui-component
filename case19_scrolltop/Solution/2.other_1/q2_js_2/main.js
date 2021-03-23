const nav = document.querySelector('nav');

/*

Way2. 최초 기준값을 설정한 후 (기준값 - 변경값)을 연산하여 스크롤 다운/업 상태를 판단. 기준값은 항상 변경값으로 치환하여 새롭게 갱신해야 함.

*/

// Write Javascript code here!
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

/**
 * [해설]
 * 기본적인 접근 방법은 `window` 객체에 `scroll` 이벤트를 바인딩하고, 스크롤 이벤트가 발생할때 가장 마지막으로 실행된 스크롤 이벤트에서 `window.scrollY` 값을 `latestWindowScrollY` 변수에 저장하고
 * `latestWindowScrollY` 변수에서 `window.scrollY` 값을 뺀 결과 값이 0보다 큰 경우 `active` 클래스를 부여, 그렇지 않은경우 제거하는 원리입니다.
 * 스크롤 이벤트는 스크롤이 진행되는동안 짧은시간내 수십여번 실행될 수 있기 때문에 성능문제를 고려해야 하는데, 이러한 부부은 `throttle` 유틸을 구현하여 해결하였습니다.
 * 이전에 구현했던 `debounce`와 다른점은, `throttle` 이벤트는 호출되는 즉시 실행이 된다는것 입니다. `debounce`와 `throttle`의 차이를 잘 알아두었다가 활용하면 좋습니다.
 *
 * `throttle` 유틸은 `debounce`과 함께 개발시 자주 사용되는 라이브러리 입니다. 사용하는 방법과 원리를 익혀두시면 좋습니다.
 * @see https://www.npmjs.com/package/lodash.throttle
 */