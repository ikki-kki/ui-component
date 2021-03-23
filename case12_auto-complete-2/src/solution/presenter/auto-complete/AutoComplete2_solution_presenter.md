## Case12 : AutoComplete 2 - 출제자 해설

### q1. 검색결과 리스트를 text input 하단에 출력하시오.

#### A)
```js
displayWordList(selector, data) {
    if (!selector || !data.length) return;
        
    selector.style.cssText = 'display: "";';
    let render = '';
    for (let i = 0; i < data.length; i++) {
        render += `
            <div class="auto-complete-item-box">
                <span>${data[i]['text']}</span>
            </div>
        `
    }
    // 리스트를 갱신해야하므로 innerHTML사용함.
    selector.innerHTML = render;

    // input element position에 list 영역을 출력하기 위해 좌표를 가져오기 위한 getBoundingClientRect 함수호출
    const inputRect = this.textinputElement.getBoundingClientRect();
    selector.style.cssText = `
        position: absolute; 
        width: ${inputRect.width}px;
        top: ${inputRect.top + inputRect.height}px;
        left: ${inputRect.left}px;
    `;

    return document.querySelectorAll('.auto-complete-item-box');
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

### q3. debounce 기능을 통해 request 호출을 최소화 하시오.
### q4. 검색 필드 외에 다른 곳을 클릭할 때 출력된 리스트를 보이지 않도록 하시오.

```js
/*
* title: event binding method
* description: 모든 이벤트를 처리한다.
*/
eventBinding() {
    let isListBoxFocus = false;
    const requestAdapter = new RequestMockAdapter();
    const dispatchEvent = debounce((targetText) => {
        // 공백 제거 후 단어가 있다면 호출한다.
        if (targetText.replace(/ /g, '')) {
            // 해당 text를 parameter로 api 호출
            requestAdapter.get(this.requestUrl, targetText)
                .then((result) => {
                    this.displayWordList(
                        this.searchListElement,
                        result
                    ).forEach((element, index) => {
                        element.addEventListener('click', (event) => {
                            this.textinputElement.value = result[index].text;
                            this.hiddenElement(this.searchListElement);
                        });
                    });
                });
        } else {
            this.hiddenElement(this.searchListElement);
        }
        
    }, this.delayTime);

    // input 에서 focusout 이벤트 발생 시 출력된 리스트를 숨긴다.
    this.textinputElement.addEventListener('focusout', () => {
        if (isListBoxFocus) return;
        this.hiddenElement(this.searchListElement);
    });

    // 필드에 마우스 포인터가 오면 리스트를 불러온다.
    this.textinputElement.addEventListener('focusin', (event) => {
        dispatchEvent(event.target.value);
    });

    // 키보드 이벤트
    this.textinputElement.addEventListener('keyup', (event) => {
        dispatchEvent(event.target.value);
    });

    // focusout 이 되면 리스트가 사라지므로 리스트에 포인터가 머물러 있을 시에는 focusout 이벤트가 일어나도 리스트를 유지하기 위함
    this.searchListElement.addEventListener('mouseover', () => {
        isListBoxFocus = true;
    });

    // 포인터가 리스트에서 떠나면 focusout 이벤트 시 리스트 사라짐
    this.searchListElement.addEventListener('mouseout', () => {
        isListBoxFocus = false;
    });
}

/*
* title: element hidden method
* description: 특정 element에 대해 display: none 옵션을 적용한다.
*/
hiddenElement(selector) {
    selector.style.cssText = 'display: none;';
}
```