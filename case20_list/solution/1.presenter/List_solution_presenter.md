## Case20 : List - 출제자 해설

### q1. Javascript - fetch

#### A)

- Fetch : https://mzl.la/3qHZmIg
- 브러우저에 내장된 함수로 외부 라이브러리 의존 없이 HTTP 통신이 가능합니다. 단, 익스플로러는 지원하지 않습니다.
- 첫 번째 인수는 API URL, 두 번째 인수는 옵션 객체를 받습니다.
- Promise 타입의 객체를 반환합니다. API 호출에 성공하면 resolve, 실패하면 reject 합니다.


```js
const ul = document.querySelector('ul');
const API = 'https://jsonplaceholder.typicode.com/posts';
// Fetch
fetch(API)
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            const li = `<li>
                            <h2>${item.title}</h2>
                            <p>${item.body}</p>
                        </li>`;
            ul.insertAdjacentHTML("beforeend", li);
        })
    })
    .catch(e => console.error(e))
```

##### 해설
- 보통 REST API는 JSON 형태로 응답하며, response 객체는 json()를 제공합니다.
- json()를 사용하면 JSON 포맷의 내용물을 자바스크립트 객체로 변환할 수 있습니다.
- insertAdjacentHTML() : https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML
- 특정 영역의 DOM 트리 안에, 원하는 위치에, 원하는 내용물을 삽입할 때 사용합니다.
- beforeend는 특정 요소 내부에서 뒤에서부터 삽입하겠다는 의미입니다.

* 옵션 객체 예시
```js
fetch(API, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    data: JSON.stringify({
        title: "Hello",
        body: "Nice to meet you",
        userId: 10,
    }),
}).then((res) => console.log(res))
```


> Fetch Refactoring
- 콜백 함수를 사용하여 통신 영역, 템플릿 영역을 분할하여 작성하면, 코드 관리가 용이해 집니다.

```js
// 응답 상태 체크
const checkStatusAndParse = res => {
    if(!res.ok) throw new Error(`Status Code Error: ${res.status}`);
    return res.json();
}

// 화면에 정보 출력
const printPosts = data => {
    data.forEach(item => {
        const li = `<li>
                        <h2>${item.title}</h2>
                        <p>${item.body}</p>
                    </li>`;
        ul.insertAdjacentHTML("beforeend", li);
    })
}

// API
const fetchPosts = (url) => {
    return fetch(url);
}

fetchPosts(API)
    .then(checkStatusAndParse)
    .then(printPosts)
    .catch(e => console.log(e))
 ```


### q2. Javascript - axios

#### A)

- Axios : https://github.com/axios/axios
- HTTP 통신을 위한 자바스크립트 라이브러리로 대부분의 브라우저에서 사용이 가능합니다.

```js
const ul = document.querySelector('ul');
const API = 'https://jsonplaceholder.typicode.com/posts';

// Axios
axios.get(API)
    .then(res => {
        const {data} = res;
        data.forEach(item => {
            const li = `<li>
                            <h2>${item.title}</h2>
                            <p>${item.body}</p>
                        </li>`;
            ul.insertAdjacentHTML("beforeend", li);
        })
    })
    .catch(e => {
        console.error(e);
    })
```

- Axios Refactoring

```js
const printPosts = res => {
    const {data} = res;
    data.forEach(item => {
        const li = `<li>
                        <h2>${item.title}</h2>
                        <p>${item.body}</p>
                    </li>`;
        ul.insertAdjacentHTML("beforeend", li);
    })
}

const fetchPosts = (url) => {
    return axios.get(url);
}

fetchPosts(API)
    .then(printPosts)
    .catch(e => console.log(e))
```



### q3. Javascript - async/await와 콜백 함수

#### A)

- async/await와 콜백 함수를 사용하면 비동기 처리를 수월하게 진행할 수 있습니다.
- try ~ catch 문으로 오류 상황을 효율적으로 관리할 수 있습니다.

```js
const printPosts = res => {
    const {data} = res;
    data.forEach(item => {
        const li = `<li>
                        <h2>${item.title}</h2>
                        <p>${item.body}</p>
                    </li>`;
        ul.insertAdjacentHTML("beforeend", li);
    })
}

const fetchPosts = async () => {
    return await axios.get(API);
}

const render = async (callApi, callTemplate) => {
    const res = await callApi();
    callTemplate(res);
}

(async () => {
    try {
        await render(fetchPosts, printPosts);
    } catch (e) {
        console.log(e);
    }
})();

```


### 4. Jquery로 기능 구현

#### A)

- beforeSend : 요청 전에 호출
- Success : 요청이 성공했을 경우 호출
- Error : 요청이 실패했을 경우 호출
- Complete : 성공, 실패 여부에 상관없이 무조건 호출되는 함수

```js
const $ul = $('ul');
const API = 'https://jsonplaceholder.typicode.com/posts';

// Ajax
$.ajax({
    url: API,
    type: 'GET',
    timeout : 1000,
    beforeSend : function() {
        console.log('요청 준비 중입니다.');
    },
    success: function (data) {
        console.log("요청이 성공했습니다.");
        data.forEach(item => {
            const li = `<li>
                            <h2>${item.title}</h2>
                            <p>${item.body}</p>
                        </li>`;
            $ul.append(li);
        })
    },
    error: function (error) {
        console.log("요청이 실패했습니다.");
        console.error(error);
    },
    complete : function() {
        console.log('요청이 완료되었습니다.');
    }
});
```
- beforeSend, complete의 경우 Loading 상태를 처리할 때 주로 활용됩니다.