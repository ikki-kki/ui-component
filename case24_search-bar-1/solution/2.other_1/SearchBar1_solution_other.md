# 검색리스트 Dropdown 구현 및 선택된 이미지 표시하기

## 문제 1
### 풀이

```html
<!-- solution/2.other_1/1. js/index.html -->
...
<main style="padding-top: 50px;">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="dropdown">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Search">
                        </div>
                        <ul class="dropdown-menu">
                        </ul>
                        <script type="text/template" id="dropdown-item-template">
                        <li class="dropdown-item" data-id="<%-id%>">
                            <img src=" <%-url%>" alt="<%-description%>">
                            <span>
                                <%- description %>
                            </span>
                        </li>
                        </script>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="p-t-50">
                        <img class="image-info" src="" alt="">
                    </div>
                </div>
            </div>
        </div>
        </div>
    </main>
    <script src="axios/axios.js"></script>
    <script src="lodash.js"></script>
    <script src="main.js"></script>
...
```
```js
// solution/2.other_1/1. js/main.js
const accessKey = "hPyF-tz9tHnxeaoTwb7q0GTw10Wxwr85cD63lk7d7UE";
const inputEl = document.querySelector('input');
const dropdownMenuEl = document.querySelector('.dropdown-menu');
const imageInfoEl = document.querySelector('.image-info');
const template = _.template(document.querySelector('#dropdown-item-template').textContent);

/**
 * 검색어가 입력됐을때 이벤트
 */
const onInputDebounceQuery = _.debounce(async (e) => {
    const { value: query } = e.target;
    try {
        /**
         * @see https://github.com/axios/axios#response-schema
         */
        const { data } = await axios.get('https://api.unsplash.com/search/photos/', {
            params: {
                client_id: accessKey,
                query
            }
        });

        const { results } = data;

        /**
         * 조회 결과가 존재하지 않는 경우 항목을 표시하지 않음
         */
        if (!results?.length) {
            dropdownMenuEl.classList.remove('show');
            return;
        }

        /**
         * 드롭다운 메뉴에 항목을 추가
         */
        dropdownMenuEl.innerHTML = results.map((item) => {
            const { id, alt_description: description } = item;
            const { regular: url } = item.urls;
            /**
             * `lodash` 템플릿을 활용하여 조회된 데이터 항목을 템플릿으로 변환
             */
            return template({
                id, description, url
            });
        }).join('');
        dropdownMenuEl.classList.add('show');
    } catch (e) {
        alert(e.isAxiosError ? '데이터 조회중 에러 발생!' : '데이터 처리중 에러 발생!');
    }
}, 250);

/**
 * 드롭다운 아이템 항목 선택시 이벤트
 * [>] 아이템 항목이 눌러졌을때의 이벤트를 `dropdownMenu` 엘리먼트에서 위임받아 처리
 */
const onClickDropdownItem = async (e) => {
    try {
        /**
         * 이벤트가 발생한 엘리먼트로부터 가장 인전한 `.dropdown-item` 엘리먼트를 찾음
         */
        const dropdownItemEl = e.target.closest('.dropdown-item');
        const id = dropdownItemEl.dataset.id;

        const { data } = await axios.get(`https://api.unsplash.com/photos/${id}`, {
            params: {
                client_id: accessKey,
            }
        });
        const {
            urls,
            alt_description: description
        } = data
        const { regular: url } = urls;

        /**
         * 이미지 객체 정보 업데이트
         */
        imageInfoEl.src = url
        imageInfoEl.alt = description

        /**
         * 열려있는 검색결과 내용을 닫고 검색어 입력창에 현재 이미지 내용을 입력
         */
        dropdownMenuEl.classList.remove('show');
        inputEl.value = description;
    } catch (e) {
        alert(e.isAxiosError ? '데이터 조회중 에러 발생!' : '데이터 처리중 에러 발생!');
    }
}

inputEl.addEventListener('keydown', onInputDebounceQuery);
dropdownMenuEl.addEventListener('click', onClickDropdownItem);
```

### 해설
- HTML 파일내 아이템 항목 템플릿을 생성하였습니다. 아래 `script` 태그로 감싼 태그 영역은 브라우저에서 랜더링되지 않고, 스크립트에서 이 문자열을 읽어 `lodash` 템플릿으로 활용합니다(자세한 내용은 참고자료를 확인해 주세요).
  ```html
  <script type="text/template" id="dropdown-item-template">
  <li class="dropdown-item" data-id="<%-id%>">
      <img src=" <%-url%>" alt="<%-description%>">
      <span>
          <%- description %>
      </span>
  </li>
  </script>
  ```
- HTML 엘리먼트를 탐색하여 담고있는 객체 네이밍은 다른 변수명과 구분될 수 있도록 `~El`으로 변경 하였습니다. 
- `lodash`에서 제공하는 `debounce` 함수를 이용하여 반복되는 입력이더라도 마지막 입력 후 500ms 경과후에 조회가되도록 구현하였습니다. `debounce`, `throttle` 함수의 개념과 차이를 알아 두시면 좋습니다.
- 기존 분리되어 구현되어있던 `fetch` 함수를 사용하지 않고, 이벤트 핸들러 내부에서 모든 구현을 처리하였습니다. 재사용될 가능성이 높거나 `fetch`에서 부가적인 처리가 많아진다면 분리하여 사용하는것도 좋은 방법입니다.
- `async/await` 비동기 처리를 하실때에는 `try~catch`를 사용하여 에러발생에 대한 처리를 해주시면 의도하지 않은 동작(예: 서버오류 등..)을 방지하거나 대응하실 수 있습니다.
- DropdownItem 클릭시 모든 항목에 이벤트를 바인딩하지 않고, DropdownMenuEl에 이벤트를 위임하여 처리하였습니다. 이벤트 위임은 항목이 가변적으로 늘어나거나 줄어드는 경우 코드 누락으로 인한 Memory Leaks을 방지할 수 있고, 항목이 많아지는 경우 메모리 사용량을 줄이고 효율적으로 동작할 수 있게 합니다.


### 참고자료
- https://lodash.com/docs/4.17.15#template
- https://lodash.com/docs/4.17.15#debounce
- https://lodash.com/docs/4.17.15#throttle
- https://ui.toast.com/weekly-pick/ko_20160826

## 문제 2
### 풀이
```html
<!-- solution/2.other_1/2. jq/index.html -->
<!-- 1번 문제풀이 내용과 동일합니다 -->
```
```js
// solution/2.other_1/2. jq/main.js
const accessKey = "hPyF-tz9tHnxeaoTwb7q0GTw10Wxwr85cD63lk7d7UE";
const $input = $('input');
const $dropdownMenu = $('.dropdown-menu');
const $imageInfo = $('.image-info');
const template = _.template($('#dropdown-item-template').text());

/**
 * 검색어가 입력됐을때 이벤트
 */
const onInputDebounceQuery = _.debounce(async (e) => {
    const { value: query } = e.target;
    try {
        /**
         * @see https://github.com/axios/axios#response-schema
         */
        const requestUrl = `https://api.unsplash.com/search/photos/?query=${query}&client_id=${accessKey}`;
        const data = await $.ajax(requestUrl, {
            method: 'GET'
        });

        const { results } = data;

        /**
         * 조회 결과가 존재하지 않는 경우 항목을 표시하지 않음
         */
        if (!results?.length) {
            $dropdownMenu.removeClass('show');
            return;
        }

        /**
         * 드롭다운 메뉴에 항목을 추가
         */
        $dropdownMenu.html(
            results.map((item) => {
                const { id, alt_description: description } = item;
                const { regular: url } = item.urls;
                /**
                 * `lodash` 템플릿을 활용하여 조회된 데이터 항목을 템플릿으로 변환
                 */
                return template({
                    id, description, url
                });
            }).join('')
        );
        $dropdownMenu.addClass('show');
    } catch (e) {
        alert(e.status !== 200 ? '데이터 조회중 에러 발생!' : '데이터 처리중 에러 발생!');
    }
}, 250);

/**
 * 드롭다운 아이템 항목 선택시 이벤트
 */
const onClickDropdownItem = async (e) => {
    try {
        const $dropdownItem = $(e.currentTarget);
        /**
         * @see https://api.jquery.com/data/
         */
        const id = $dropdownItem.data('id');

        const requestUrl = `https://api.unsplash.com/photos/${id}/?client_id=${accessKey}`;
        const data = await $.ajax(requestUrl, {
            method: 'GET'
        });
        const {
            urls,
            alt_description: description
        } = data
        const { regular: url } = urls;

        /**
         * 이미지 객체 정보 업데이트
         * @see https://api.jquery.com/attr/
         */
        $imageInfo.attr('src', url);
        $imageInfo.attr('alt', description);

        /**
         * 열려있는 검색결과 내용을 닫고 검색어 입력창에 현재 이미지 내용을 입력
         * @see https://api.jquery.com/addclass/
         * @see https://api.jquery.com/removeclass/
         */
        $dropdownMenu.removeClass('show');
        /**
         * @see https://api.jquery.com/val/
         */
        $input.val(description);
    } catch (e) {
        alert(e.isAxiosError ? '데이터 조회중 에러 발생!' : '데이터 처리중 에러 발생!');
    }
}

$input.on('keydown', onInputDebounceQuery);
/**
 * [!] 아이템 항목이 눌러졌을때의 이벤트를 `dropdownMenu` 엘리먼트에서 위임받아 처리
 */
$dropdownMenu.on('click', '.dropdown-item', onClickDropdownItem);
```

### 해설
- 1번 문제풀이 내용과 대부분 동작은 비슷하지만 jQuery 라이브러리를 활용하여 DOM을 제어하고 ajax 유틸을 활용하여 코드가 더 간결해졌습니다.
- jQuery를 이용할 경우 이벤트 위임을 간단하게 구현하실 수 있습니다(코드 내용을 참고해 주세요)
- jQuery 내부적으로 XHR 처리할 수 있는 `$.ajax`를 지원하여 `axios`대신 사용하실수 있습니다.

### 참고자료
- https://api.jquery.com/data/
- https://api.jquery.com/attr/
- https://api.jquery.com/addclass/
- https://api.jquery.com/removeclass/
- https://api.jquery.com/val/
- https://api.jquery.com/on/
- https://api.jquery.com/html/
- https://api.jquery.com/text/

## 결론
- jQuery, lodash 등과 같은 라이브러리를 사용하면 코드를 더 쉽고 빠르게 작성하실수 있습니다. 라이브러리를 사용하는것도 좋지만 어떻게 동작하는지 원리를 잘 알고 사용하시면 더 좋을것 같습니다.
- 사용하시는 라이브러리 API목록을 잘 살펴보시고 알아두시면 나중에 필요한 순간에 빠르게 코드를 작성하실수 있습니다. 오픈소스로 만들어진 라이브러리는 여러명에 의해 확인되고 검증된 기능을 제공하기 때문에 더 안정적이고 더 효율적일 수 있습니다.