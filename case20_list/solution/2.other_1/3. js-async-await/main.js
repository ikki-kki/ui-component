// const ul = document.querySelector('ul');
/**
 * 가급적 셀렉터 대상에게는 class or id 값을 명시적으로 지정해 주시는것이 좋습니다.
 * [>] 태그 이름을 이용해 셀렉트 하는 경우 의도하지 않는 대상이 선택될 수 있습니다.
 */
const listEl = document.querySelector('#list');
const API = 'https://jsonplaceholder.typicode.com/posts';

// Fetch : https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Fetch%EC%9D%98_%EC%82%AC%EC%9A%A9%EB%B2%95

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
