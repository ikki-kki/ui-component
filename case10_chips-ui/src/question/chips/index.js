/*
* title: Chips class
* description: chips ui component
* configuration:
    selector: component를 display할 영역,
    data: component으로 표현할 리스트
*/ 
export class Chips {
    constructor(configuration) {
        // 설정정보
        this.data = configuration.data;
        // list가 출력되는 container element
        this.container = document.querySelector(configuration.selector);

        // 초기 템플릿 display
        this.chipElements = this.initialize(this.container, configuration.data);
        this.inputElement = this.initializeInput(this.container);
        // event listen
        this.eventBinding();
    }

    /*
    * title: 최초 data 기준으로 chip item을 display
    * input: display 되는 element
    * output: chip element list
    * description: 최초 생성할 때 item list를 출력한다.
    */
    initialize(selector, data) {
        // q1. 데이터에 따른 문자열 리스트와 입력 폼을 함께 출력하시오.
        // TODO: Write JS code here!'

        // 생성된 chip element를 리턴해준다.
        return selector;
    }

    /*
    * title: 최초 input element를 생성함.
    * input: display 되는 element
    * output: input element
    * description: 최초 한번 input element를 생성한다.
    */
    initializeInput(selector) {
        // q1. 데이터에 따른 문자열 리스트와 입력 폼을 함께 출력하시오.
        // TODO: Write JS code here!'

        return selector;
    }

    /*
    * title: event binding method
    * description: 모든 이벤트를 처리한다.
    */
    eventBinding() {
        // q2. 입력된 문자열은 키보드 이벤트 엔터를 통해 리스트의 앞단에 추가 하시오.
        // TODO: Write JS code here!'
        /*
         ==* insertAdjacentElement *==
        'beforebegin': targetElement그 자체 전에 .
        'afterbegin': targetElement첫 번째 자식 앞에.
        'beforeend': 막내 targetElement, 마지막 자식 뒤.
        'afterend': targetElement자체 후 .

        <!-- beforebegin -->
        <p>
            <!-- afterbegin -->
            foo
            <!-- beforeend -->
        </p>
        <!-- afterend -->
        */

        // q3. 입력된 문자열을 삭제할 수 있도록 하시오.
        // TODO: Write JS code here!'
    }

    // q4. 입력된 문자열에 대한 데이터를 가져올 수 있도록 하시오.
    // TODO: Write JS code here!'

}
