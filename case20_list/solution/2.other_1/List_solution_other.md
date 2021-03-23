## Case20 : List - 대기업 S사 프론트엔드 개발자님의 답안

### 문제 1 ~ 4 공통 코드 조각
```html
...
<body>
    <ul id="list">
        <script type="text/script" id="template">
        <li>
            <h2><%=title%></h2>
            <p><%=description%></p>
        </li>
        </script>
    </ul>
    ...
</body>
...
```
##### 해설
- `<script type="text/script">` 태그내 포함된 태그 내용은 브라우저가 화면에 랜더링 하지 않습니다.
- 위 `script` 내 태그정보는 JS에서 템플릿 정보로 활용합니다(아래 JS 코드를 확인해 주세요)

```js
/**
 * 템플릿 유틸
 * @param {*} htmlString 
 */
const makeTemplate = (htmlString) => {
    return (obj) => {
        let template = htmlString;
        Object.keys(obj).forEach((key) => {
            template = template.replace(RegExp(`<%=${key}%>`, "g"), obj[key]);
        })
        return template.replace(/<%=\w+?%>/g, '');
    }
}
const template = makeTemplate(document.body.querySelector('#template').textContent);
```
##### 해설
- `lodash.template` 코드와 유사한 HTMLString을 이용하여 템플릿을 생성하는 코드를 구현해 보았습니다.
- 입력받은 HTMLString, Object 정보를 이용하여 템플릿을 생성합니다.

##### 참고자료
- https://lodash.com/docs/4.17.15#template


### q1. Javascript - fetch

#### A)

```js
// solution/2.other_1/1. js-fetch/main.js
/**
 * 가급적 셀렉터 대상에게는 class or id 값을 명시적으로 지정해 주시는것이 좋습니다.
 * [>] 태그 이름을 이용해 셀렉트 하는 경우 의도하지 않는 대상이 선택될 수 있습니다.
 */
const listEl = document.querySelector('#list');
const API = 'https://jsonplaceholder.typicode.com/posts';

...

// 통신 상태 처리
const checkStatusAndParse = res => {
    /**
     * [!] `res.ok`는 서버 에러를 탐지하기 위한 값이 아닙니다.
     * HTTP status `200~299` 응답이 오는경우 `true` 값이 전달되며, `30x` redirection 응답이 오는 경우 `false` 값이 전달됩니다.
     * 조회 실패, 서버에러등 `40x, 50x` 처리를 위해서는 `catch` 블록을 사용해 주세요
     * @see https://ko.javascript.info/fetch
     */
    if (res.ok) { // `res.ok` 대신 `res.status < 300` 값으로 동일하게 확인할 수 있습니다.
        return res.json();
    } else {
        throw Error(`예상하지 못한 HTTP Status(${res.status}) 응답 입니다.`);
    }
}

// 템플릿
const printPosts = data => {
    const listHtml = data.map(({ title, body: description }) => {
        return template({ title, description });
    })
    listEl.innerHTML = listHtml;
}

// HTTP 통신
const fetchPosts = (url) => {
    return fetch(url);
}

fetchPosts(API)
    .then(checkStatusAndParse)
    .then(printPosts)
    .catch(error => {
        alert(error.message);
    })

```

##### 해설
- `fetch` 함수의 `res.ok` 의미에 대해 잘 알아두면 좋을것 같습니다.
  - HTTP status `200~299` 응답이 오는경우 `true` 값이 전달되며, `30x` redirection 응답이 오는 경우 `false` 값이 전달됩니다.
  - 조회 실패, 서버에러등 `40x, 50x` 처리를 위해서는 `catch` 블록을 사용해 주세요

##### 참고자료
- https://ko.javascript.info/fetch


### q2. Javascript - axios

#### A)

```js
/**
 * 가급적 셀렉터 대상에게는 class or id 값을 명시적으로 지정해 주시는것이 좋습니다.
 * [>] 태그 이름을 이용해 셀렉트 하는 경우 의도하지 않는 대상이 선택될 수 있습니다.
 */
const listEl = document.querySelector('#list');
const API = 'https://jsonplaceholder.typicode.com/posts';

...
// solution/2.other_1/2. js-axios/main.js
// 통신 상태 처리
const checkStatusAndParse = res => {
    /**
     * `Fetch`에서 사용된 `res.ok` 값과 동일한 기능을 아래와 같이 구현하실 수 있습니다.
     */
    if (res.status < 300) {
        return res.data;
    } else {
        throw Error(`예상하지 못한 HTTP Status(${res.status}) 응답 입니다.`);
    }
}

// 템플릿
const printPosts = data => {
    const listHtml = data.map(({ title, body: description }) => {
        return template({ title, description });
    })
    listEl.innerHTML = listHtml;
}

// HTTP 통신
const fetchPosts = (url) => {
    return axios.get(url);
}

fetchPosts(API)
    .then(checkStatusAndParse)
    .then(printPosts)
    .catch(error => {
        alert(error.message);
    })
```

##### 해설
- 문제 1번과 다른점은 `fetch` 대신 `axios` 라이브러리를 사용한 것 입니다. 다른 라이브러리를 사용했더라도 동작은 완전히 같습니다!

##### 참고자료
- https://ko.javascript.info/fetch
- https://github.com/axios/axios#response-schema


### q3. Javascript - async/await와 콜백 함수

#### A)

```js
// solution/2.other_1/3. js-async-await/main.js
/**
 * 가급적 셀렉터 대상에게는 class or id 값을 명시적으로 지정해 주시는것이 좋습니다.
 * [>] 태그 이름을 이용해 셀렉트 하는 경우 의도하지 않는 대상이 선택될 수 있습니다.
 */
const listEl = document.querySelector('#list');
const API = 'https://jsonplaceholder.typicode.com/posts';

...

// 템플릿
const printPosts = data => {
    const listHtml = data.map(({ title, body: description }) => {
        return template({ title, description });
    })
    listEl.innerHTML = listHtml;
}


// HTTP 통신
const fetchPosts = () => {
    return axios.get(API);
}

/**
 * [!] 인자로 전달되는 함수 이름을 헷갈리지 않도록 임의로 변경해 주었습니다. 😅
 */
const render = async (asyncFetchPostsFn, printPostsFn) => {
    try {
        const res = await asyncFetchPostsFn();
        /**
         * checkStatusAndParse 함수에서 체크하던 로직
         */
        const { status, data } = res;
        if (status > 300) {
            throw Error(`예상하지 못한 HTTP Status(${res.status}) 응답 입니다.`);
        }
        /**
         * 데이터를 화면에 그림
         */
        printPostsFn(data);
    } catch (e) {
        alert(e.message);
    }
}


(async () => {
    await render(fetchPosts, printPosts);
})();
```

##### 해설
- 문제 1, 2번과 동작은 완전히 같으며 `async/await`을 이용하여 처리하였습니다.(코드내 변수 네이밍을 약간 변경하였는데 이부분은 꼭 정답이 있는것은 아닙니다.)

##### 참고자료
- https://ko.javascript.info/fetch
- https://github.com/axios/axios#response-schema


### 4. Jquery로 기능 구현

#### A)
```js
/**
 * 가급적 셀렉터 대상에게는 class or id 값을 명시적으로 지정해 주시는것이 좋습니다.
 * [>] 태그 이름을 이용해 셀렉트 하는 경우 의도하지 않는 대상이 선택될 수 있습니다.
 */
const $list = $('#list');
const API = 'https://jsonplaceholder.typicode.com/posts';

...

// Ajax
$.ajax(API, {
    method: 'GET',
    beforeSend: (_xhr, _opts) => {
        alert('요청 보내기 전입니다!');
    },
    success: function (data, _, res) {
        const { status } = res;
        if (status > 300) {
            /**
             * 기존 `checkStatusAndParse` 기능을 구현
             * [>] 에러 콜백을 강제로 호출(더 좋은 방법이 있다면 알려주세요!)
             */
            this.error(Error(`예상하지 못한 HTTP Status(${res.status}) 응답 입니다.`));
        }
        /**
         * 템플릿을 이용한 HTML 생성
         */
        const listHtml = data.map(({ title, body: description }) => {
            return template({ title, description });
        })
        /**
         * 화면에 목록을 그림
         */
        $list.html(listHtml);
    },
    error: (e) => {
        alert(e.message);
    },
    complete: () => {
        alert('요청에 대한 응답 처리가 완료 됐습니다!');
    },
})

```

##### 해설
- 문제 1, 2, 3번과 동작은 완전히 같으며 jQuery에서 지원하는 `$.ajax` 유틸을 사용하였습니다.

##### 참고자료
- https://api.jquery.com/jquery.ajax/


##### 결론
- 다른 라이브러리라 하더라도 구현 원리만 잘 이해하고 있다면 같은동작을 만들어낼 수 있습니다.
  - 프로젝트에서 이미 사용되고 있거나, 가장 잘 활용할 수 있는 라이브러리를 사용하시면 좋습니다.
- `XMLHttpRequest` 객체에 대해서도 잘 알아두시면 좋습니다(`fetch`가 나오기 전까지 모든 XHR 통신은 이 객체를 통해 구현되었습니다.)
  - https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest