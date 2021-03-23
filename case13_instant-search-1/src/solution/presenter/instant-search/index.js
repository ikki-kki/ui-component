import { debounce } from './util';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/*
* title: InstantSearch class
* description: instant search ui component
* configuration:
    selector: 검색필드를 display할 영역,
    css: 적용할 css 명칭 ,
    placeholder: 검색필드 안내문구,
    delayTime: 지연시간,
    changeEvent: 텍스트 입력시 이벤트
*/ 
export class InstantSearch {
    constructor(configuration) {
        // 내부변수
        // default delay time
        this.DEFAULT_DELAY_TIME = 500;
        // rxjs subscription (구독을 해제하기 위한 변수)
        this.subscription = null;

        // 설정정보
        // callback setup
        this.callback = configuration.changeEvent;
        // delayTime setup
        this.delayTime = configuration.delayTime ?? this.DEFAULT_DELAY_TIME;

        // 초기 템플릿 display, 이벤트 대상 저장
        this.textinputElement = this.initialize(document.querySelector(configuration.selector), configuration);

        // event listen
        this.eventBinding();
    }

    /*
    * title: instant search display method
    * input: display 되는 element, configuration placeholder, css 정보
    * output: text input element
    * description: 최초 생성할 때 input element를 생성한다. 템플릿을 관리한다.
    */
    initialize(selector, configuration) {
        const textinput = document.createElement('input');
        textinput.setAttribute('type', 'text');
        textinput.setAttribute('placeholder', configuration.placeholder);
        textinput.classList.add(configuration.css);
        selector.appendChild(textinput);
        // 생성된 input element를 리턴해준다.
        return textinput;
    }

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
}
