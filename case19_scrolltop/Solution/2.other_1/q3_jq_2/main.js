const $nav = $('nav');

/*
  
Way1. 스크롤 위치를 기준으로 적용
 
*/

// Write Jquery code Here!
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


/**
 * [해설]
 * 기본적인 접근방법은 `q2`와 동일하나, `throttle`의 딜레이를 늘려 함수가 실행되는 횟수를 줄여 성능을 향상시켰습니다.
 */