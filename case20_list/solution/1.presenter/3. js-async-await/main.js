const ul = document.querySelector('ul');
const API = 'https://jsonplaceholder.typicode.com/posts';


// q3. Javascript - async/await와 콜백 함수를 사용하여 해당 기능을 구현하세요.

// 템플릿
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

// HTTP 통신
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
