const ul = document.querySelector('ul');
const API = 'https://jsonplaceholder.typicode.com/posts';


// Fetch : https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Fetch%EC%9D%98_%EC%82%AC%EC%9A%A9%EB%B2%95
// q1-1. Fetch함수를 사용하여 해당 기능을 구현하시오
// Do something here!




// q1-2. Fetch Refactoring : 콜백함수를 사용하여 통신 영역, 템플릿 영역을 분할하여 작성하시오 
// 통신 상태 처리
const checkStatusAndParse = res => {
    // Do something here!

}

// 템플릿
const printPosts = data => {
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
const fetchPosts = (url) => {
    return fetch(url);
}

fetchPosts(API)
    // Do something here!
