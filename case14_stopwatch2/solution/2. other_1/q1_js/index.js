/**
 * 기존 Timer를 인스턴스 생성 가능한 함수로 구현하여 개발
 * [>] 여러개의 인스턴스를 생성하여 동시에 여러 타이머를 만들수 있음
 * [>] 타이머 메소드 네이밍 변경, 이미 객체(인스턴스)는 타이머를 가르키기 때문에 메소드에 `Timer`가 포함되지 않도록 변경
 * [>] 데이터와 랜더링 처리 로직을 완전히 분리하여 처리
 */
function Timer() {
    /**
     * 타이머 진행 시간(초)
     */
    this.seconds = 0;
    /**
     * Pause 여부
     */
    this.isPause = false;
    /**
     * `intervalId` 아이디
     */
    this.intervalId;
    /**
     * 타이머가 업데이트 됐을때 콜백
     */
    this.updateCallbackFn;
}

Timer.prototype.start = function () {
    const { intervalId } = this;
    if (intervalId) {
        clearInterval(intervalId);
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
     */
    this.intervalId = setInterval(() => {
        const { seconds } = this;
        this.setTimer(seconds + 1);
    }, 1000);
};

Timer.prototype.pause = function () {
    if (this.intervalId) {
        clearInterval(this.intervalId);
    }
};

Timer.prototype.reset = function () {
    this.pause();
    this.setTimer(0);
};

Timer.prototype.setUpdateCallback = function (callbackFn) {
    this.updateCallbackFn = callbackFn;
}

Timer.prototype.setTimer = function (seconds) {
    const { updateCallbackFn } = this;
    this.seconds = seconds;
    if (typeof updateCallbackFn === 'function') {
        updateCallbackFn(this.seconds);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const minEl = document.querySelector('#min');
    const secEl = document.querySelector('#sec');

    const seconds = new Timer();
    seconds.setUpdateCallback((seconds) => {
        let min = Math.floor(seconds / 60);
        min = 10 > min ? '0' + min : min;
        let sec = seconds % 60;
        sec = 10 > sec ? '0' + sec : sec;
        /**
         * 타이머 업데이트
         */
        minEl.textContent = min;
        secEl.textContent = sec;
    })

    document.querySelector('#start').addEventListener('click', function () {
        seconds.start();
    });

    document.querySelector('#pause').addEventListener('click', function () {
        seconds.pause();
    });

    document.querySelector('#reset').addEventListener('click', function () {
        seconds.reset();
    });
});