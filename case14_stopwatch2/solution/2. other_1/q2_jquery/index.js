/**
 * 기존 Timer를 인스턴스 생성 가능한 함수로 구현하여 개발
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

$(() => {
    const minEl = $('#min');
    const secEl = $('#sec');

    const seconds = new Timer();
    seconds.setUpdateCallback((seconds) => {
        let min = Math.floor(seconds / 60);
        min = 10 > min ? '0' + min : min;
        let sec = seconds % 60;
        sec = 10 > sec ? '0' + sec : sec;
        /**
         * 타이머 업데이트
         */
        minEl.text(min);
        secEl.text(sec);
    })

    $(document.body)
        /**
         * Jquery Event Delegation을 이용하여 `body`에서 이벤트를 위임받아 모든 버튼이벤트를 처리
        */
        .on('click', '#start, #pause, #reset', ({ target }) => {
            const id = target.getAttribute('id');
            switch (id) {
                case 'start':
                    seconds.start();
                    break;
                case 'pause':
                    seconds.pause();
                    break;
                case 'reset':
                    seconds.reset();
                    break;
            }
        });
})