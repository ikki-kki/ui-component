/**
 * 
 <해설 중점포인트>
- 페이지 번호를 동적으로 생성했을 때, 이벤트를 할당하기
- 페이지네이션 페이지번호를 주었을 때, 나오는 게시물수 컨트롤하기
- 활성화 된 버튼 처리하기

 */

var comments = [{
    id: 1,
    profile_url: "https://picsum.photos/id/1/50/50",
    author: "abc_1",
    content: "UI 테스트는 어떻게 진행하나요",
    createdAt: "2020-05-01",
  },
  {
    id: 2,
    profile_url: "https://picsum.photos/id/2/50/50",
    author: "abc_2",
    content: "막히면 대답은 빨리 해주나요",
    createdAt: "2020-05-02",
  },
  {
    id: 3,
    profile_url: "https://picsum.photos/id/3/50/50",
    author: "abc_3",
    content: "코드에러가 발생했는데 어딘지 모르겠어요",
    createdAt: "2020-05-03",
  },
  {
    id: 4,
    profile_url: "https://picsum.photos/id/4/50/50",
    author: "abc_4",
    content: "Javascript 기초가 부족한데 좋은 가이드 있나요",
    createdAt: "2020-05-04",
  },
  {
    id: 5,
    profile_url: "https://picsum.photos/id/5/50/50",
    author: "abc_5",
    content: "Typescript는 어떤점에서 좋나요",
    createdAt: "2020-05-05",
  },
  {
    id: 6,
    profile_url: "https://picsum.photos/id/6/50/50",
    author: "abc_6",
    content: "React 소스 배포는 보통 어떤식으로 하나요.",
    createdAt: "2020-05-06",
  },
  {
    id: 7,
    profile_url: "https://picsum.photos/id/7/50/50",
    author: "abc_7",
    content: "주변에 React 개발자 있나요",
    createdAt: "2020-05-07",
  },
  {
    id: 8,
    profile_url: "https://picsum.photos/id/8/50/50",
    author: "abc_8",
    content: "Typescript 배워 보려고 합니다. 어떻게 배우는게 빠를까요",
    createdAt: "2020-05-08",
  },
  {
    id: 9,
    profile_url: "https://picsum.photos/id/9/50/50",
    author: "abc_9",
    content: "컴포넌트 테스트는 어떻게 하나요.",
    createdAt: "2020-05-09",
  },
  {
    id: 10,
    profile_url: "https://picsum.photos/id/10/50/50",
    author: "abc_10",
    content: "storybook은 무엇인가요.",
    createdAt: "2020-05-10",
  },
  {
    id: 11,
    profile_url: "https://picsum.photos/id/11/50/50",
    author: "abc_11",
    content: "주변에 React 개발자 있나요",
    createdAt: "2020-05-11",
  },
  {
    id: 12,
    profile_url: "https://picsum.photos/id/12/50/50",
    author: "abc_12",
    content: "주변에 React 개발자 있나요",
    createdAt: "2020-05-12",
  },
  {
    id: 13,
    profile_url: "https://picsum.photos/id/13/50/50",
    author: "abc_13",
    content: "주변에 React 개발자 있나요",
    createdAt: "2020-05-13",
  },
  {
    id: 14,
    profile_url: "https://picsum.photos/id/14/50/50",
    author: "abc_14",
    content: "Next.js 가이드 주세요.14",
    createdAt: "2020-05-14",
  },
  {
    id: 15,
    profile_url: "https://picsum.photos/id/15/50/50",
    author: "abc_15",
    content: "vue vs react 뭐가 좋나요.",
    createdAt: "2020-05-15",
  },
  {
    id: 16,
    profile_url: "https://picsum.photos/id/16/50/50",
    author: "abc_16",
    content: "Atomic 디자인은 무엇인가요",
    createdAt: "2020-05-16",
  },
  {
    id: 17,
    profile_url: "https://picsum.photos/id/18/50/50",
    author: "abc_17",
    content: "UI 테스트는 어떻게 진행하나요",
    createdAt: "2020-05-17",
  },
  {
    id: 18,
    profile_url: "https://picsum.photos/id/18/50/50",
    author: "abc_18",
    content: "local storage는 언제 사용하는게 좋나요.",
    createdAt: "2020-05-18",
  },
  {
    id: 19,
    profile_url: "https://picsum.photos/id/19/50/50",
    author: "abc_19",
    content: "막히면 대답은 빨리 해주나요",
    createdAt: "2020-05-19",
  },
  {
    id: 20,
    profile_url: "https://picsum.photos/id/20/50/50",
    author: "abc_20",
    content: "Form 처리는 어떻게 하면 깔끔할까요",
    createdAt: "2020-05-20",
  },
  {
    id: 21,
    profile_url: "https://picsum.photos/id/21/50/50",
    author: "abc_21",
    content: "typescript도 배워 보려고 합니다. 어떻게 배우는게 빠를까요",
    createdAt: "2020-05-21",
  },
  {
    id: 22,
    profile_url: "https://picsum.photos/id/22/50/50",
    author: "abc_22",
    content: "주변에 React 개발자 있나요",
    createdAt: "2020-05-22",
  },
];

function Pagination() {
  // 초기값 셋팅
  this.current_page = 1;
  this.limit = 5;
  this.total_page = Math.ceil(comments.length / this.limit);
}

/*
총 페이지 수는 commets 배열의 길이를 한페이지에 보여질 게시물수로 나눈다.
ex) 한페이지에 5개씩 보이고 총 게시물 수가 23 개라면
23/5 를 올림 계산해서 5페이지가 나온다. 올림을 하는 이유는 마지막 페이지에 게시물 수가 3개라도 1페이지로 치기 때문이다.
*/


Pagination.prototype.getComments = function (page) {
  var start = (page - 1) * this.limit;
  this.current_page = page;
  var limit = start + this.limit;

  //> 아래와 같이 처리 하는 것은 배열의 인덱스가 시작지점부터 한페이지에 보여질 게시물 수의 인덱스로 처리하기 위함이다.
  return comments.filter(function (_, index) {
    if (index >= start && index < limit) return true;
    else return false;
  });
};

/*
Parameter 각 페이지를 인자로 주었을때, Return 해당하는 게시물 수
시작지점부터 한페이지에 보여질 게시물 수를 보여준다

- 1 page ) 0번부터 5(한페지에 보여줄숫자)까지의 게시물을 보여주면된다. start : 23*(1페이지-1) * limit
- 2 page ) (2-1) * 5
- 3 page ) (3-1) * 5

각 시작지점은 위와 같고 5개의 게시물씩 보여주면 된다.
*/


//>게시물 배열을 넘겼을 때 html 태그에 맞춰서 출력해주는 함수를 구현한다.
Pagination.prototype.getCommentFormat = function (comments) {

  //아래와 같이 처리 하는것은 html 양식에 맞춰 순회하면서 acc 에 누적해서 리턴해주기 위함이다.
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


//> 총 페이지의 숫자를 입력시 페이지를 화면에 뿌려주는 함수를 구현한다.
Pagination.prototype.getPageListFormat = function () {
  var result = "";

  for (var num = 1; num <= this.total_page; num++) {
    var className = num == this.current_page ? "active" : "";
    result += '<button class="' + className + '">' + num + "</button>";
  }

  return result;
};

document.addEventListener("DOMContentLoaded", function () {
  var pagination = new Pagination();

  var commentContainer = document.querySelector("#commentContainer");
  var pageContainer = document.querySelector("#pageContainer");

  commentContainer.innerHTML = pagination.getCommentFormat(
    pagination.getComments(1)
  );
  pageContainer.innerHTML = pagination.getPageListFormat();

  // 1. 문서가 로드 된 뒤 1페이지에 해당하는 게시물을 보여준다
  // 2. 페이지 리스트들을 보여주고, 1페이지를 활성화한다.

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


/*

1. 각 페이지 버튼을 클릭했을 때, 페이지에 해당하는 게시물을 뿌려주고
2. 하단 페이지리스트를 뿌려준다.
3. event.target.matches 로 처리한것은 각 클릭시 하단도 새로 리프레시 되므로 문서가 로드하고나서 이벤트를 할당하지 않고 클릭하고나서 해당 셀렉터 인지 확인한 후에 작동하게 한다.

#### 추가로 생각해볼 점
pagination 객체로 생성했는데, html 안에 데이터를 넣어주는 부분도 pagination 함수안에 넣어줄지 말지 어느부분이 설계상 더 좋을지 고민해보기

*/