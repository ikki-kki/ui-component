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