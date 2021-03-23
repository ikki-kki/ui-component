// const ul = document.querySelector('ul');
/**
 * 가급적 셀렉터 대상에게는 class or id 값을 명시적으로 지정해 주시는것이 좋습니다.
 * [>] 태그 이름을 이용해 셀렉트 하는 경우 의도하지 않는 대상이 선택될 수 있습니다.
 */
const listEl = document.querySelector('#list');
const API = 'https://jsonplaceholder.typicode.com/posts';

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
