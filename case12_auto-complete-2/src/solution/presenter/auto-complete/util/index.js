/*
* title: debounceTime 함수
* input: callback 실행될 함수, delayTime 지연시간
* output: setTimeout이 적용된 함수
* description: 해당 함수의 커플링과 독립성을 위해 delayTime 의 디폴트 값을 500ms로 함.
*/
export const debounce = (callback, delayTime = 500) => {
    let timeout = null;
    return (...args) => {
        // 실행되지 않은 settimeout은 clear
        if (timeout) clearTimeout(timeout);

        // settimeout clear를 위해 저장.
        timeout = setTimeout(() => {
            // 지정된 함수 실행
            callback(...args);
            // 함수 실행 후 settimeout clear
            clearTimeout(timeout);
        }, delayTime);
    }
}