export const throttle = (func, delay) => {
  let throttled = null;
  return (...args) => {
    // 만약 throttle에 값이 지정이 되어있다면 아무것도 안하게한다.
    if (!throttled) {
      throttled = true;
      //true가 되면 일정한 시간동안 함수가 실행이 되고
      setTimeout(() => {
        func(...args);
        // 그제서야 false가 된다.
        throttled = false;
      }, delay);
    }
  };
};

export const debounce = (func, delay) => {
  let timeoutId = null;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(null, ...args), delay);
  };
};
