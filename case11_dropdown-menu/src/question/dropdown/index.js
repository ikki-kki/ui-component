/*
* title: DropDownList class
* description: dropdown ui component
* configuration:
    idField: 해당 row의 id로 활용할 key
    labelField: 해당 row의 label로 활용할 key
    data: 표현될 리스트
    changeEvent: 선택된 데이터를 받을 수 있는 callback
    selector: 선택된 데이터를 표시할 라벨 영역
    backdrop: dropdown list를 출력할 영역
*/ 
export class DropDownList {
    constructor(configuration) {
        // 내부 변수
        this.rowHeight = 27;
        // 라벨이 없을 경우
        this.emptyLabel = '선택하세요.';
        // 현재 선택된 index -1은 선택이 안되어 있음을 의미.
        this.currentIndex = -1;

        // data list의 id 필드 명시
        this.idField = configuration.idField || 'id';
        // data list의 label 필드 명시
        this.labelField = configuration.labelField || 'label';
        // 옵션 데이터 리스트
        this.data = configuration.data;
        // change 변경에 따른 callback
        this.callback = configuration.changeEvent;
        // 선택할 때 마다 선택된 라벨을 표현해줄 element setup
        this.dropdownLabel = this.initialize(document.querySelector(configuration.selector), this.emptyLabel);
        // backdrop 영역 element setup
        this.backdrop = document.querySelector(configuration.backdrop);
        this.dropdownItem = this.displayDropdownItemList(this.backdrop, configuration.data);
        // event listen
        this.eventBinding();
    }

    /*
    * title: dropdown label display method
    * input: display 되는 element, label 없을 시 출력할 string
    * output: dropdown label 영역 element
    * description: 최초 생성할 때 dropdown 라벨 영역을 출력한다. 라벨 영역 템플릿을 관리한다.
    */
    initialize(selector, emptyLabel) {
        const dropdownLabel = document.createElement('div');
        dropdownLabel.classList.add('dropdown-select-label-container');
        let render = `
            <span class="dropdown-select-label">${emptyLabel}</span>
            <div class="dropdown-select-arrow-container">
                <div class="dropdown-select-arrow"></div>
            </div>
        `;
        dropdownLabel.insertAdjacentHTML('afterbegin', render);
        selector.appendChild(dropdownLabel);
        // 생성된 라벨 영역을 리턴해준다.
        return dropdownLabel;
    }

    /*
    * title: dropdown item list display method
    * input: display 되는 element, label 없을 시 출력할 string
    * output: dropdown label 영역 element
    * description: dropdown item 영역을 출력한다.
    */
    displayDropdownItemList(selector, data) {
        if (!selector) return;
        
        let render = '<div class="dropdown-item-list-box">';
        for (let i = 0; i < data.length; i++) {
            render += `
                <div class="dropdown-item-box">
                    <span>${data[i][this.labelField]}</span>
                </div>
            `
        }
        render += '</div>';
        // 리스트를 갱신해야하므로 innerHTML사용함.
        selector.innerHTML = render;

        // q1. label position에 dropdown list 영역을 출력하시오.
        // TODO: Write JS code here!'
        // label position에 dropdown list 영역을 출력
        const target = document.querySelector('.dropdown-item-list-box');

        return target;
    }

    /*
    * title: event binding method
    * description: 모든 이벤트를 처리한다.
    */
    eventBinding() {
        // backdrop 영역 클릭 시 이벤트
        this.backdrop.addEventListener('click', () => {
            // q2. backdrop 영역 클릭 시의 이벤트를 처리하시오.
            // TODO: Write JS code here!'
        });

        // label 영역 클릭 시 이벤트
        this.dropdownLabel.addEventListener('click', () => {
            // q3. label 영역 클릭 시의 이벤트를 처리하시오.
            // TODO: Write JS code here!'
        });

        document.querySelectorAll('.dropdown-item-box')
        .forEach((item, index) => {
            item.addEventListener('click', (event) => {
                const currentOption = this.retriveOptionByIndex(index);
                if (this.currentIndex > -1) {
                    this.unselectedDropdownItem(this.currentIndex);
                }
                this.currentIndex = index;

                if (this.currentIndex > -1) {
                    this.selectedDropdownItem(this.currentIndex);
                }

                // q4. 함수(dispatchEvent)를 참조하여 id, label 값을 인자로 넘겨 이벤트를 발생시키시오.
                // TODO: Write JS code here!'
            });
        });
    }

    /*
    * title: dropdown event execute method
    * description: dropdown 에서 발생된 이벤트를 외부로 전송
    */ 
    dispatchEvent(item) {
        // 선택된 아이템의 라벨로 변경하고, dropdown item 영역을 화면에서 보이지 않도록 하시오.
        this.dropdownLabel.querySelector('.dropdown-select-label').innerHTML = item[this.labelField];
        this.backdrop.style.cssText = 'display: none;';
        // 선택된 아이템을 외부로 callback 함수를 통해 전달.
        this.callback(item);
    }

    selectedDropdownItem(index) {
        document.querySelectorAll('.dropdown-item-box')[index].classList.add('selected');
    }

    unselectedDropdownItem(index) {
        document.querySelectorAll('.dropdown-item-box')[index].classList.remove('selected');
    }

    retriveOptionByIndex(index) {
        const targetOption = this.data[index];
        !targetOption.label ? this.emptyLabel : targetOption.label;
        return targetOption;
    }
}