const todoApi = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})

const form = document.querySelector('form');
const title = document.querySelector('#title');
const body = document.querySelector('#body');
const user = document.querySelector('#user');
const loading = document.querySelector('#loading');

const postTodoApi = (data) => {
    return todoApi({
        method: 'post',
        url: '/posts',
        data: data
    })
}
const postTodo = async (data, callApi, callback) => {
    try {
        const res = await callApi(data);
        callback(true, res.data, '등록했습니다.');
    } catch (e) {
        callback(false, null, '등록을 실패했습니다.');
        console.error(e);
    }
}

todoApi.interceptors.request.use(
    function (config) {
        loading.style.display = 'block';
        return config;
    },
    function (error) {
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