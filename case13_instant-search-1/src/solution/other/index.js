import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * @class Instant Search
 * @desc Instant Search UI Component
 * @param options.wrapperSelector 검색 입력창 래퍼 셀렉터
 * @param options.placeholder 플레이스 홀더
 * @param options.classNames 검색창 클래스 정보
 * @param options.debounceDelay 단어 입력 후 지연시간
 */
export class InstantSearch {
    constructor({
        wrapperSelector,
        placeholder,
        classNames,
        debounceDelay = 500
    }) {
        /**
         * 멤버 변수로 등록
         */
        this._debounceDelay = debounceDelay;
        /**
         * <해설>
         * `initialize` 함수를 분리하는것도 좋지만 `constructor` 생성자 자체가 그 역할을 하기 때문에 따로 분리하지 않았습니다.
         */
        const eventStream = new Subject();
        const inputEl = this._makeSearchInputEl(classNames, placeholder);
        document.querySelector(wrapperSelector).append(inputEl);
        /**
         * 입력된 키 이벤트를 `eventStream` 스트림으로 전송
         */
        inputEl.addEventListener('keyup', eventStream.next.bind(eventStream));
        /**
         * `destroy` 메서드에서 참조 가능하도록 멤버변수로 등록
         */
        this._eventStream = eventStream;
        this._inputEl = inputEl;
    }
    /**
     * <해설>
     * 함수의 이름만 보고 함수가 하는 역할을 알 수 있도록 하는것이 좋습니다.
     * [>] 하나의 함수에서 너무 많은일을 하지 않도록 합니다.
     * [>] 함수의 입출력 값이 명확하다면 나중에 테스트코드를 쉽게 만드실 수 있습니다.
     */
    _makeSearchInputEl(classNames, placeholder = 'Please enter') {
        const inputEl = document.createElement('input');
        inputEl.setAttribute('type', 'text');
        inputEl.setAttribute('placeholder', placeholder);
        inputEl.classList.add(classNames);
        return inputEl;
    }
    /**
     * `subscribe` 메서드를 이용하여 이벤트 쿠독 콜백 등록
     */
    subscribe(callbackFn) {
        const { _eventStream: eventStream, _debounceDelay: debounceDelay } = this;
        return eventStream.pipe(debounceTime(debounceDelay)).subscribe(callbackFn);
    }
    /**
     * 검색 엘리먼트를 제거하고, 이벤트 스트림을 종료
     */
    destroy() {
        this._eventStream.complete();
        this._inputEl.remove();
    }
}