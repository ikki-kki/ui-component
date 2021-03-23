const nav = document.querySelector('nav');

/*
  
Way1. 스크롤 동작을 감지하기 위해 window 객체 또는 document 객체에 addEventListener를 사용하여 스크롤 이벤트를 추가. 스크롤 이벤트로 지금 스크롤 중인지 아닌지를 감지.
 
*/
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

/**
 * [해설]
 * 기본적인 접근 방법은 `window` 객체에 `scroll` 이벤트를 바인딩하고, 스크롤 이벤트가 발생할때 `window.scrollY` 값을 확인하여 클래스를 적용하는 것입니다.
 * 스크롤 이벤트는 스크롤이 진행되는동안 짧은시간내 수십여번 실행될 수 있기 때문에 성능문제를 고려해야 하는데, 이러한 부부은 `debounce` 유틸을 구현하여 해결하였습니다.
 *
 * `debounce` 유틸은 `throttle`과 함께 개발시 자주 사용되는 라이브러리 입니다. 사용하는 방법과 원리를 익혀두시면 좋습니다.
 * @see https://www.npmjs.com/package/debounce
 */