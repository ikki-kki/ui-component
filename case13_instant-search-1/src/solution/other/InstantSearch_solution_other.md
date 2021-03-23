## Case13 : Instant Search - 타 시니어 개발자 해설

- **[!] 기존 문제 내용을 조금 다른 관점에서 풀어보았습니다(코드구조 변경 재작성). 사용된 라이브러리(RxJS), 학습 키워드 및 개발환경은 동일합니다.**

#### 풀이
```js
// src/index_other_1.js
import './style.css';
import { InstantSearch } from './solution/other_1/instant-search';
/**
 * 더미 데이터
 */
const worldItems = [
    {
        word: '서울'
    },
    ...
];

/**
 * 단어 목록을 노출할 엘리먼트
 */
const wordListEl = document.querySelector('#wordlist');

/**
 * 데이터 입력으로 템플릿(HTML) 문자열을 생성하는 함수
 */
const makeWrodListHtml = (data) => {
    let itemList = '';
    for (let i = 0; i < data.length; i++) {
        itemList += `
        <div>
            <span>${data[i].word}</span>
        </div>`
    }
    return itemList;
}

/**
 * 내부 구현이 서버 데이터를 불러오는 로직으로 변경될 경우 응답을 동일하게 구현할 수 있도록 비동기 응답 구현
 */
const selectDataItems = (query) => {
    const selectedDataItems = query ? worldItems.filter(({ word }) => word.startsWith(query)) : worldItems
    return Promise.resolve(selectedDataItems);
}

const renderWordList = (query = '') => {
    /**
     * async/await 사용 가능한 환경에서는 더 간단하게 코드를 구현할 수 있습니다.
     */
    return new Promise((resolve) => {
        selectDataItems(query).then((wordItems) => {
            const wordListHtml = makeWrodListHtml(wordItems);
            wordListEl.innerHTML = wordListHtml;
            resolve(wordListEl);
        });
    });
};

const bootstrap = () => {
    /**
     * 단어 목록이 노출될 엘리먼트
     */
    const instantSearch = new InstantSearch({
        wrapperSelector: '#instant-search',
        classNames: 'instant-search-input',
        placeholder: 'please enter keyword'
    });

    instantSearch.subscribe(({ target }) => {
        const { value: query } = target
        renderWordList(query);
    });

    // 최초에 전체 리스트를 출력.
    renderWordList();
};

// src/solution/other_1/instant-search/index.js
...
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
     * [>] 함수의 입출력 값이 명확하다면 나중에 테스트 코드를 쉽게 만드실 수 있습니다.
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
...
```
##### 해설
> 용어: 클래스 내부에 사용되는 함수는 '메소드', 클래스 내부에서 선언되어 여러 메소드에서 참조되어 사용되는 변수들을 멤버변수라고 합니다.
- 기존 문제 코드에서 변수 및 함수 네이밍을 다르게 작성해 보았습니다.
  - **[!] 함수의 이름이나 구현 범위는 꼭 정답이 있는것은 아닙니다.**
  - 함수의 경우 이름만 보고 함수가 하는 역할을 알 수 있도록 개선해 보았습니다.
    - 하나의 함수에서 너무 많은 일을 하지 않도록 하였습니다.
    - 함수의 입출력 값이 명확하다면 테스트가 쉬워집니다.
      - 그렇다고 함수가 너무 작은단위로 파편화 되지 않게 주의하세요, 함수가 실행될때 마다 발생하는 스코프를 생성하는 시간이 쌓이면 성능에 영향을 줄 수 있습니다.
- 내부적으로 사용되는 prviate 멤버변수, 메소드의 이름은  `_(언더바)`로 네이밍 하였습니다.
  - 일반적으로 오픈소스 라이브러리에서 자주 보이는 패턴이기도 한데 언더바로 시작하는 필드는 찾아보시면, 대부분 내부 처리를 위해 만든 필드이거나 변경/삭제 될 수 있기 때문에 꼭 확인해 보시는게 좋습니다.
  - public과  private 필드 선언은 자바스크립트 표준화 위원회에 실험적 기능 (stage 3)  TC39 로 제안되어있습니다. 현재 이를 지원하는 브라우져는 제한적인 상태입니다만, Babel 과 같은 build 시스템을 사용한다면 이 기능을 사용해볼 수 있습니다.
- **InstantSearch** 클래스로 생성된 인스턴스의 `subscribe` 기능을 이용하여 키 입력 이벤트를 구독할 수 있습니다.
  - `InstantSearch` 클래스는 내부적으로 이벤트 스트림(Rx.Subject)를 가지고 있고, 구독하는 모든 대상에게 이벤트 스트림을 전달합니다.

##### 참고자료
- http://reactivex.io/documentation/ko/subject.html
- https://rxjs-dev.firebaseapp.com/api/operators/debounceTime
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes

##### 결론
- RxJS를 잘 모른다면 조금 어려울 수 있는 문제 같습니다. 다양한 라이브러리를 사용해 보는것도 좋은것 같습니다. 대부분의 라이브러리나 프레임워크에는 만들게된 동기(Motivation)나, 지향점, 철학 또는 해결하고자 하는 목적이 있는데 라이브러리를 사용하기전에 한번 찾아보고 공감이 되신다면 금방 익숙해질것 같습니다.