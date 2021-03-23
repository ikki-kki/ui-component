/**
 * 
 <중점 포인트>
- jQuery 문서로드 처리하기
- jQuery로 동적 엘리멘트 생성 시, 이벤트를 할당하는 방법

 */

function Pagination() {
  // 초기값 셋팅
  this.current_page = 1;
  this.limit = 5;
  this.total_page = Math.ceil(comments.length / this.limit);
}

Pagination.prototype.getComments = function (page) {
  var start = (page - 1) * this.limit;
  this.current_page = page;
  var limit = start + this.limit;

  return comments.filter(function (_, index) {
    if (index >= start && index < limit) return true;
    else return false;
  });
};

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

Pagination.prototype.getPageListFormat = function () {
  var result = "";

  for (var num = 1; num <= this.total_page; num++) {
    var className = num == this.current_page ? "active" : "";
    result += '<button class="' + className + '">' + num + "</button>";
  }

  return result;
};


// Write jQuery code here!
$(document).ready(function () {
  var pagination = new Pagination();
  var commentContainer = $("#commentContainer");
  var pageContainer = $("#pageContainer");

  commentContainer.html(pagination.getCommentFormat(pagination.getComments(1)));
  pageContainer.html(pagination.getPageListFormat());

  $(document).on("click", "#pageContainer button", function () {
    var page = $(this).html();
    commentContainer.html(
      pagination.getCommentFormat(pagination.getComments(page))
    );
    pageContainer.html(pagination.getPageListFormat());
  });
});



/**
 * 
 <해설>
 - vanila.ja와 구현은 비슷하다. 문서 로드 시 $(document).ready로 처리하고, 아래와 같이 on click으로 동적 처리를 실행한다.
 $(document).on("click", "#pageContainer button", function () {
       var page = $(this).html();
       commentContainer.html(
         pagination.getCommentFormat(pagination.getComments(page))
       );
       pageContainer.html(pagination.getPageListFormat());
       
 */