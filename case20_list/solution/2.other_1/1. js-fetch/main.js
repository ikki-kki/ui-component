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
