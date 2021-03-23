const $ul = $('ul');
const API = 'https://jsonplaceholder.typicode.com/posts';

// Ajax
/**
 * beforeSend : 요청 전에 호출
 * Success : 요청이 성공했을 경우 호출되는 함수
 * Error : 요청이 실패했을 경우 호출되는 함수
 * Complete : 성공, 실패 여부에 상관없이 무조건 호출되는 함수
 */

 
// Write jQuery code here!
$.ajax({
    url: API,
    type: 'GET',
    timeout : 1000,
    beforeSend : function() {
        console.log('요청 준비 중입니다.');
    },
    success: function (data) {
        console.log("요청이 성공했습니다.");
        data.forEach(item => {
            const li = `<li>
                            <h2>${item.title}</h2>
                            <p>${item.body}</p>
                        </li>`;
            $ul.append(li);
        })
    },
    error: function (error) {
        console.log(error);
    },
    complete : function() {
        console.log('요청이 완료되었습니다.');
    }
});