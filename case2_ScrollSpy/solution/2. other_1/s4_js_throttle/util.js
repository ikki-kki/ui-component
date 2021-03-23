export const debounce = (func, delay) => {
  let timeoutId = null;
  return (...arg) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(null, ...arg), delay);
  };
};

/**
 * [!] Partner's solution에 작성된 `throttle` 동작과 조금 다른방식으로 처리 하였습니다.
 */
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

/**
 * <해설>
 * 이벤트가 연속하여 발생하는 경우 `throttle`, `debounce`를 이용하여 불필요한 처리를 제한하여 성능을 향상 시킬수 있습니다.
 * `throttle`, `debounce` 동작원리와 차이를 잘 알아두었다가 적절하게 활용하면 좋을것 같습니다.
 *
 * @see https://iill.in/fmjtge8 Throttle 와 Debounce 개념 정리하기
 */