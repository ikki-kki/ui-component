const $nav = $('nav');

/*
  
Way1. 스크롤 위치를 기준으로 적용
 
*/

// Write Jquery code Here!
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

/**
 * 기본적인 접근 방법은 `q1` 문제와 동일합니다. `scroll` 이벤트와 `mousewheel` 이벤트 차이에 대해 알아두시면 도움이 될 것 같습니다.
 */