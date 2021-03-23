const ul = document.querySelector('ul');
const API = 'https://jsonplaceholder.typicode.com/posts';



// Fetch
// q1-1. Fetch함수를 사용하여 해당 기능을 구현하시오
// Do something here!
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





// q1-2. Fetch Refactoring : 콜백함수를 사용하여 통신 영역, 템플릿 영역을 분할하여 작성하시오 
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