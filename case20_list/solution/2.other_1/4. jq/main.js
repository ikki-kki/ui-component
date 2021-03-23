// const ul = document.querySelector('ul');
/**
 * 가급적 셀렉터 대상에게는 class or id 값을 명시적으로 지정해 주시는것이 좋습니다.
 * [>] 태그 이름을 이용해 셀렉트 하는 경우 의도하지 않는 대상이 선택될 수 있습니다.
 */
const $list = $('#list');
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
const template = makeTemplate($('#template').text());

// Ajax
// Write jQuery code here!
$.ajax(API, {
    method: 'GET',
    beforeSend: (_xhr, _opts) => {
        alert('요청 보내기 전입니다!');
    },
    success: function (data, _, res) {
        const { status } = res;
        if (status > 300) {
            /**
             * 기존 `checkStatusAndParse` 기능을 구현
             * [>] 에러 콜백을 강제로 호출(더 좋은 방법이 있다면 알려주세요!)
             */
            this.error(Error(`예상하지 못한 HTTP Status(${res.status}) 응답 입니다.`));
        }
        /**
         * 템플릿을 이용한 HTML 생성
         */
        const listHtml = data.map(({ title, body: description }) => {
            return template({ title, description });
        })
        /**
         * 화면에 목록을 그림
         */
        $list.html(listHtml);
    },
    error: (e) => {
        alert(e.message);
    },
    complete: () => {
        alert('요청에 대한 응답 처리가 완료 됐습니다!');
    },
})
