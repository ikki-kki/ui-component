## Case18 : Pagination - 출제자 해설

###  q1.  vanilla.js 로 코드를 작성해보세요.
​
> 중점포인트
- 페이지 번호를 동적으로 생성했을 때, 이벤트를 할당하기
- 페이지네이션 페이지번호를 주었을 때, 나오는 게시물수 컨트롤하기
- 활성화 된 버튼 처리하기
​
####  A)
```js
function  Pagination(){
​
// 초기값 셋팅
this.current_page = 1;
this.limit = 5;
this.total_page = Math.ceil( comments.length / this.limit );
}
```
총 페이지 수는 commets 배열의 길이를 한페이지에 보여질 게시물수로 나눈다.
ex) 한페이지에 5개씩 보이고 총 게시물 수가 23 개라면
23/5 를 올림 계산해서 5페이지가 나온다.
올림을 하는 이유는 마지막 페이지에 게시물 수가 3개라도 1페이지로 치기 때문이다.
​
```js
Pagination.prototype.getComments = function(page){
​
var  start = ( page - 1 ) * this.limit;
this.current_page = page;
var  limit = start + this.limit;
return  comments.filter( function( _ , index ){
    if(index >= start && index < limit ) return  true;
    else  return  false;
​
});
​
}
​
```
Parameter 각 페이지를 인자로 주었을때
Return 해당하는 게시물 수
​
시작지점부터 한페이지에 보여질 게시물 수를 보여준다
- 1 page ) 0번부터 5(한페지에 보여줄숫자)까지의 게시물을 보여주면된다. start : 23*(1페이지-1) * limit
- 2 page ) (2-1) * 5
- 3 page ) (3-1) * 5
각 시작지점은 위와 같고 5개의 게시물씩 보여주면 된다.
​
> 아래와 같이 처리 하는 것은 배열의 인덱스가 시작지점부터 한페이지에 보여질 게시물 수의 인덱스로 처리하기 위함이다.

```js
return  comments.filter( function( _ , index ){
​   if(index >= start && index < limit ) return  true;
​   else  return  false;
});
```
> 게시물 배열을 넘겼을 때 html 태그에 맞춰서 출력해주는 함수를 구현한다.
​
```js
Pagination.prototype.getCommentFormat = function (comments) {
  return comments.reduce(function (acc, comment) {
    return (
      acc +
      `<div class="commentWrap">
            <img src="` +
      comment.profile_url +
      `" alt="" />
            ` +
      comment.author +
      `
            <div class="createdAt">
                ` +
      comment.createdAt +
      `
            </div>
            <div class="content">
                ` +
      comment.content +
      `
            </div>
            <hr />
        </div>`
    );
  }, "");
};
```

아래와 같이 처리 하는것은 html 양식에 맞춰 순회하면서 acc 에 누적해서 리턴해주기 위함이다.
```js
return  comments.reduce( function(acc, comment ){
```
​
> 총 페이지의 숫자를 입력시 페이지를 화면에 뿌려주는 함수를 구현한다.
​
```js
Pagination.prototype.getPageListFormat = function () {
  var result = "";

  for (var num = 1; num <= this.total_page; num++) {
    var className = num == this.current_page ? "active" : "";
    result += '<button class="' + className + '">' + num + "</button>";
  }

  return result;
};
```
​
​
```js
document.addEventListener("DOMContentLoaded", function () {
  var pagination = new Pagination();

  var commentContainer = document.querySelector("#commentContainer");
  var pageContainer = document.querySelector("#pageContainer");

  commentContainer.innerHTML = pagination.getCommentFormat(
    pagination.getComments(1)
  );
  pageContainer.innerHTML = pagination.getPageListFormat();

```
1. 문서가 로드 된 뒤 1페이지에 해당하는 게시물을 보여준다
2. 페이지 리스트들을 보여주고, 1페이지를 활성화한다.
​
​
```js
  document.addEventListener(
    "click",
    function (event) {
      // If the clicked element doesn't have the right selector, bail
      if (event.target.matches("#pageContainer button")) {
        var page = event.target.innerHTML;
        commentContainer.innerHTML = pagination.getCommentFormat(
          pagination.getComments(page)
        );
        pageContainer.innerHTML = pagination.getPageListFormat();
        return;
      }
    },
    false
  );
});
​
```
1. 각 페이지 버튼을 클릭했을 때, 페이지에 해당하는 게시물을 뿌려주고
2. 하단 페이지리스트를 뿌려준다.
3. event.target.matches 로 처리한것은 각 클릭시 하단도 새로 리프레시 되므로 문서가 로드하고나서 이벤트를 할당하지 않고 클릭하고나서 해당 셀렉터 인지 확인한 후에 작동하게 한다.
​
##### 생각해볼 점
pagination 객체로 생성했는데,
html 안에 데이터를 넣어주는 부분도
pagination 함수안에 넣어줄지 말지 어느부분이 설계상 더 좋을지 고민해보기
​
> 아래부분
```js
pagination.getCommentFormat(pagination.getComments(1));
```
​

###  q2.  jQuery 로 코드를 작성해보세요.
​
> 중점포인트
1. jQuery 문서로드 처리하기
2. jQuery로 동적으로 엘리멘트 생성시, 이벤트를 할당하는 방법
​
####  A)
- vanilia.js 와 구현은 비슷하다
- 문서 로드시 $(document).ready 로 처리 하고
​
> 아래와 같이 on click 으로 동적 처리를 실행한다.

```js

  $(document).on("click", "#pageContainer button", function () {
    var page = $(this).html();
    commentContainer.html(
      pagination.getCommentFormat(pagination.getComments(page))
    );
    pageContainer.html(pagination.getPageListFormat());
  });

```
​
###  q3.  React 로 코드를 작성해보세요.
​
> 중점포인트
- 각 클릭시 React로 상태를 어떻게 처리하는지
​
#### A)
- Redux toolkit 을 사용했다.
- actions 와 reducers는 아래와 같이 작성한다.

```js
export  const { getComments } = slice.actions;
export  const  commentsReducer = slice.reducer;
```
​
```js
getComments( state, action ) {
​
const  start = ( action.payload.page - 1 ) * state.limit;
const  limit = start + state.limit;
​
state.data = state.comments.filter(
​
( _ , index ) => {
  if(index >= start && index < limit ) return  true;
​  else  return  false;
}
);
​
state.current_page = action.payload.page;
}

```
- 위에 vanila.js 와 같이 페이지 네이션을 처리한다.
- getComments 라는 액션을 생성한다.
- initialState 에 data 라는 변수를 생성한 이유는 comments 임시 데이터는 유지하고 보여질 부분만 그때그때 data 변수를 생성한다.
​- 게시물을 보여주는 부분은 data를 참조해서 본다.
​
##### 추가로 생각해볼 점
useState 로 redux 없이 구현해보기