## Case11 : DropdownMenu - 타 시니어 개발자의 해설지

#### A)

```js
// solution/2.others_1/index.js
...
/**
 * 유저 데이터
 */
const userDataItems = [
    {
        id: "01",
        userName: "Kenneth",
        favorites: "0001"
    },
    ...
];

/**
 * 항목 데이터
 */
const selectorDataItems = [
    {
        id: '',
        label: '선택하세요.'
    },
    {
        id: '0001',
        label: 'Google'
    },
    ...
];

/**
 * 아이디를 이용해 빠르게 찾기 위해 맵 구조의 데이터를 생성
 */
const websiteIndex = selectorDataItems.reduce((map, { id, label }) => {
    map[id] = label;
    return map;
}, {});

class DropdownList {
    constructor(selectorEl, selectorOptionsEl, dataItems = [], updateSelectorIndexCallbackFn = () => null) {
        /**
         * 셀렉터 엘리먼트
         */
        this.selectorEl = selectorEl;
        /**
         * 옵션 엘리먼트
         */
        this.selectorOptionsEl = selectorOptionsEl;
        /**
         * 최초 선택된 아이템
         */
        this.currentSelectedIndex = 0;
        /**
         * 항목 아이템
         */
        this.dataItems = dataItems;
        /**
         * 선택 항목 업데이트시 호출되는 콜백 함수
         */
        this.updateSelectorIndexCallbackFn = updateSelectorIndexCallbackFn;
        this.renderSelector();
        this.renderSelectorOptions();
        this.bindSelectorEvents();
        this.bindSelectorOptionsEvents();
    }

    /**
     * 현재 선택된 인덱스를 반환
     */
    getCurrentSelectedIndex() {
        return this.currentSelectedIndex;
    }

    /**
     * 현재 선텍된 인덱스의 항목 데이터를 반환
     */
    getCurrentSelectedItem() {
        const { dataItems, currentSelectedIndex } = this;
        return dataItems[currentSelectedIndex];
    }

    /**
     * 셀렉터 랜더링
     */
    renderSelector() {
        const { currentSelectedIndex, dataItems, selectorEl } = this;
        const selectedItem = dataItems[currentSelectedIndex];
        selectorEl.innerHTML = `
        <div class="dropdown-select-label-container">
            <span class="dropdown-select-label">${selectedItem.label}</span>
            <div class="dropdown-select-arrow-container">
                <div class="dropdown-select-arrow"></div>
            </div>
        </div>
        `;
    }

    /**
     * 셀렉터 항목 랜더링
     */
    renderSelectorOptions() {
        /**
         * 선택 항목
         */
        const { currentSelectedIndex, selectorOptionsEl, selectorEl } = this;
        const items = this.dataItems.map((item, index) => {
            const { label } = item;
            return `
            <div class="dropdown-item-box ${currentSelectedIndex === index ? 'selected' : ''}" data-index=${index}>
                <span>${label}</span>
            </div>
            `;
        });
        const { height } = selectorEl.getBoundingClientRect();
        selectorOptionsEl.style.cssText = `display: none; position: absolute; top: ${height}px; `;
        selectorOptionsEl.innerHTML = `
        <div class="dropdown-item-list-box">
            ${items.join('')}
        </div>
        `;
    }

    /**
     * 셀렉터 이벤트 바인딩
     */
    bindSelectorEvents() {
        const { selectorEl, selectorOptionsEl } = this;
        selectorEl.addEventListener('click', (e) => {
            e.preventDefault();
            selectorOptionsEl.style.display = 'block';
        });
    }

    /**
     * 셀렉터 항목 이벤트 바인딩
     */
    bindSelectorOptionsEvents() {
        const {
            dataItems,
            selectorOptionsEl,
        } = this;

        selectorOptionsEl.addEventListener('click', ({ target }) => {
            let el = target;
            if (el.tagName === 'SPAN') {
                /**
                 * 기존 마크업을 수정하지 않고 `data-id`가 있는 엘리먼트를 탐색
                 */
                el = el.parentElement;
            }
            const index = Number(el.dataset.index);
            this.currentSelectedIndex = index;
            /**
             * 셀렉터 랜더링
             */
            this.renderSelector();
            /**
             * 콜백으로 데이터 전달
             */
            this.updateSelectorIndexCallbackFn(dataItems[index], index);
        });

        document.addEventListener('click', () => {
            this.selectorOptionsEl.style.display = 'none';
        }, 'click')
    }
}

/**
 * DOM 파싱이 완료되면 스크립트 실행
 */
document.addEventListener('DOMContentLoaded', () => {
    const selectorEl = document.querySelector('#dropdown');
    const selectorOptionsEl = document.querySelector('.back-drop');
    const userListEl = document.querySelector('#userlist');
    /**
     * 유저 목록 페이지를 그림
     * @param {*} item 
     */
    const renderUserList = (item) => {
        const { id } = item;
        const userItems = userDataItems.filter(({ favorites }) => {
            /**
             * 아이디가 빈 값인경우 모든 아이템 노출,
             * 그렇지 않은경우 해당 아이디만 노출
             */
            return id === '' ? true : id === favorites;
        });
        userListEl.innerHTML = userItems.map((user) => {
            const { favorites, userName } = user;
            const favoriteLabel = websiteIndex[favorites];
            return (`
            <div>
                <span>User: ${userName}</span>,
                <span>favorites: ${favoriteLabel}</span>
            </div>`);
        }).join('');
    };

    const dropDownList = new DropdownList(selectorEl, selectorOptionsEl, selectorDataItems, renderUserList);
    const currentSelectedItem = dropDownList.getCurrentSelectedItem();
    /**
     * 최초 유저목록 강제로 랜더링
     */
    renderUserList(currentSelectedItem);
});

```

##### 해설
> [!] 기존 문제 HTML + CSS + 더미데이터 내용을 가지고 다른 방법으로 접근하여 풀이하였습니다.
- Dropdown 기능을 셀렉터 기능으로 제한하고, 유저 목록이 랜더링 되는 부분은 분리하여 결합도와 복잡도를 낮추도록 해 보았습니다.
  - Dropdown 메뉴에서 항목을 선택하면 Callback 함수로 선택된 항목 데이터가 전달됩니다.
  - 선택된 항목 데이터를 이용하여 유저 목록을 랜더링합니다.
- 위 코드에 사용된 기술 원리는 아래 참고자료를 확인해 주세요.

##### 참고자료
- https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- https://medium.com/@uriyang/data-structure-2-map-8ca759c74445
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object

##### 결론
- 위와같은 구현은 어떤 방법으로 풀든 정답은 없는것 같습니다. 저의 경우는 코드의 복잡도를 낮추는것을 선호하기 때문에 가능한 기능단위로 묶어서 구현하고자 하였습니다. 
- 위 내용의 풀이가 꼭 정답은 아니며 이런 방법의 접근도 있다는것 정도만 참고해 주셔도 좋을것 같습니다.