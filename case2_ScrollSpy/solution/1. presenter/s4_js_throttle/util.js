export const throttle = (func, delay) => {
  let throttled = false;
  // do something
  return (...args) => {
    if (!throttled) {
      throttled = true;
      setTimeout(() => {
        func(...args);
        throttled = false;
      }, delay);
    }
  };
};

export const debounce = (func, delay) => {
  let timeoutId = null;
  return (...arg) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(null, ...arg), delay);
  };
};





/**
 * 
 <해설>
스크롤 이벤트는 스크롤 동작을 하는 동안 계속해서 발생하므로 모든 이벤트에 대해 콜백을 호출하는 것은 성능에 좋지 않다.
마지막 이벤트만을 감시하는 것으로 충분했던 무한스크롤과 달리 연속적인 이벤트에 대해 꾸준히 변경사항을 반영하는 것이 필요하므로, throttle이 적합하다.

 */