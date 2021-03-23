/**
 * 입력된 `func` 함수가 즉시 실행되고, 반복하여 호출되더라도 `delay` 이내에는 실행되지 않음
 * 
 * @param {function} func 
 * @param {number} delay 단위는 milliseconds 입니다.
 */
const throttle = (func, delay) => {
    /**
     * 마지막 실행된 시간을 저장
     */
    let latestExecuteTime = 0;
    const debounceFn = debounce(func, delay);
    return (...args) => {
        /**
         * 'latestExecuteTime(마지막 실행 시간) + delay' 값이 Date.now(현재 시간, ms) 보다 작은경우 함수를 실행
         */
        if (latestExecuteTime + delay < Date.now()) {
            func(...args);
            /**
             * 마지막 함수가 실행된 값을 저장
             */
            latestExecuteTime = Date.now();
        } else {
            /**
             * 그렇지 않은 경우 `debounce` 동작
             */
            debounceFn(...args);
        }
    }
}