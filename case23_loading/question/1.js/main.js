// API 기본 설정
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

// post API 설정
const postTodoApi = (data) => {
    // Write JS Code Here!

}


// 응답 상태 처리
const postTodo = async (data, callApi, callback) => {
    // Write JS Code Here!

}


// 통신 전 상태 표시
todoApi.interceptors.request.use(
    // Write JS Code Here!

)

form.addEventListener('submit', async function (e) {
    // Write JS Code Here!

});

const result = (isSuccess, data, message) => {
    // Write JS Code Here!
    
}