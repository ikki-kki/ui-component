## Case13 : Instant Search - 출제자 해설

### q1. configuration을 참고하여 input element를 생성하시오. (기능과 디자인을 분리하기 위한 방법)

#### A)
```js
/*
* title: instant search display method
* input: display 되는 element, configuration placeholder, css 정보
* output: text input element
* description: 최초 생성할 때 input element를 생성한다. 템플릿을 관리한다.
*/
initialize(selector, configuration) {
    const textinput = document.createElement('input');
    textinput.setAttribute('type', 'text');
    textinput.setAttribute('placeholder', configuration.placeholder ?? 'Please enter');
    textinput.classList.add(configuration.css);
    selector.appendChild(textinput);
    // 생성된 input element를 리턴해준다.
    return textinput;
}
```


### q2. debounce 기능을 구현하시오.

#### A)
```js
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
```

### q3. debounce 기능을 통해 가져온 데이터를 외부로 전달한다.

```js
/*
* title: event binding method
* description: 모든 이벤트를 처리한다.
*/
eventBinding() {
    // debounce uitl case
    const dispatchEvent = debounce((targetText) => {
        // 입력된 단어를 callback 함수를 통해 전달.
        this.callback(targetText);
    }, this.delayTime);

    this.textinputElement.addEventListener('keyup', (event) => {
        dispatchEvent(event.target.value);
    });

    // rxjs debounceTime operator case
    // fromEvent 는 지정된 이벤트 대상에서 오는 특정 유형의 이벤트를 내보내는 Observable 만들어 반환합니다.
    // pipe라는 함수를 통해 이벤트 흐름을 만들 수 있는데, 여기에 debounceTime operator를 넣습니다.
    const eventSource = fromEvent(this.textinputElement, 'keyup')
        .pipe(
            debounceTime(this.delayTime)
        );

    // 이벤트 소스에서 구독을 하게되면 이벤트가 발생할 때 마다 값을 전달 받게 됩니다.
    this.subscription = eventSource.subscribe((event) => {
        dispatchEvent(event.target.value);
    })
}
```


### q4. Promise를 사용하여 검색 키워드에 맞는 데이터를 가져와 리스트를 출력하시오. 

```js
const getData = (targetWord = '') => {
    // q4. Promise를 사용하여 검색 키워드에 맞는 데이터를 가져와 리스트를 출력하시오.
    // TODO: Write JS code here!'
    // 정답 본 파일 60행에 주석으로 처리되어 있습니다.
    retrieveWordList(targetWord)
       .then((result) => {
           displayWordList(document.querySelector('#wordlist'), result);
       });
}
```