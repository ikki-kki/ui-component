## Case23 : Loading - 출제자 해설

### q1. JavaScript로 해당 기능을 구현하시오

#### A)
```js
// API 기본 설정
const todoApi = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})

// Post API 설정
const postTodoApi = (data) => {
    return todoApi({
        method: 'post',
        url: '/posts',
        data: data
    })
}

// 응답 상태 처리
const postTodo = async (data, callApi, callback) => {
    try {
        const res = await callApi(data);
        callback(true, res.data, '등록했습니다.');
    } catch (e) {
        callback(false, null, '등록을 실패했습니다.');
        console.error(e);
    }
}

const form = document.querySelector('form');
const title = document.querySelector('#title');
const body = document.querySelector('#body');
const user = document.querySelector('#user');
const loading = document.querySelector('#loading');

```

- axios.create() : Axios 기본 설정을 세팅하는 메서드.


```js
todoApi.interceptors.request.use(
    function (config) {
      // 요청을 보내기 전에 수행할 일
      loading.style.display = 'block';
      return config;
    },
    function (error) {
      // 오류 요청을 보내기 전에 수행할 일
      return Promise.reject(error);
    }
)

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const data = {
      title: title.value,
      body: body.value,
      userId: user.value
    }

    await postTodo(data, postTodoApi, result);
});

const result = (isSuccess, data, message) => {
    loading.style.display = 'none';
    if(isSuccess) {
      alert(message);
    } else {
      alert(message);
    }
}
```




