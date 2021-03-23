/**
 * 샘플 데이터
 */
const comments = [{
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

//Wirte JS code Here
/**
 * 페이징 객체
 * @param {*} commentContainerEl 
 * @param {*} paginationContainerEl 
 * @param {*} initialItems 
 */
const Pagination = function (
    commentContainerEl,
    paginationContainerEl,
    initialItems = []
) {
    if (this.constructor !== Pagination) {
        throw Error('객체를 생성후 사용해 주세요!');
    }
    /**
    * 현재 페이지 인덱스(0부터 시작)
    */
    this.currentPageIndex = 0;
    /**
    * 페이지당 최대 노출 목록 갯수
    */
    this.maxPageItemCount = 5;
    /**
     * 초기 데이터 세팅
     */
    this.commentItems = initialItems;
    /**
     * Comment 컨테이너
     */
    this.commentContainerEl = commentContainerEl;
    /**
     * Pagination 컨테이너
     */
    this.paginationContainerEl = paginationContainerEl;

    /**
     * 최초 화면을 랜더링
     */
    this.render();

    const onClickButtons = (event) => {
        /**
         *  버튼 컨테이너에서 이벤트를 위임받아 처리
         */
        const { target } = event
        if (target.tagName === 'BUTTON') {
            const index = Number(target.dataset.index);
            this.setCurrentPageIndex(index);
        }
    };

    this.paginationContainerEl
        .addEventListener('click', onClickButtons);

    /**
     * 랜더링된 페이지를 지우고 할당된 데이터를 모두 해제
     */
    this.destroy = () => {
        this.currentPageIndex = 0;
        this.commentItems = null;

        this.commentContainerEl.innerHTML = '';
        this.paginationContainerEl.innerHTML = '';

        paginationContainerEl.removeEventListener('click', onClickButtons);

        this.commentContainerEl = undefined;
        this.paginationContainerEl = undefined;
    }
};

/**
 * 데이터 변경
 * @param {*} commentItems 
 */
Pagination.prototype.setPageItems = function (commentItems) {
    if (this.constructor !== Pagination) {
        throw Error('객체를 생성후 사용해 주세요!');
    }
    this.commentItems = commentItems;
    this.render();
};

/**
 * 컨테이너 엘리먼트를 변경
 * @param {*} commentContainerEl 
 */
Pagination.prototype.setCommentContainerEl = function (commentContainerEl) {
    this.commentContainerEl = commentContainerEl;
};

/**
 * 페이징 컨테이너 변경
 * @param {*} paginationContainerEl 
 */
Pagination.prototype.setPaginationContainerEl = function (paginationContainerEl) {
    this.paginationContainerEl = paginationContainerEl;
}

/**
 * 게시글 목록 생성
 */
Pagination.prototype.makeCommentsHtml = function () {
    if (this.constructor !== Pagination) {
        throw Error('객체를 생성후 사용해 주세요!');
    }
    const {
        commentItems,
        currentPageIndex,
        maxPageItemCount
    } = this;
    const startIndex = currentPageIndex * maxPageItemCount;
    return commentItems
        .slice(startIndex, startIndex + maxPageItemCount)
        .map((item) => {
            const {
                id,
                profile_url,
                author,
                content,
                createdAt
            } = item;
            return (
                `<div class="commentWrap" data-id="${id}">
                    <img src="${profile_url}" alt="" />
                    ${author}
                    <div class="createdAt">
                        ${createdAt}
                    </div>
                    <div class="content">
                        ${content}
                    </div>
                </div>
                <hr />
                `
            );
        })
        .join('');
};

/**
 * 페이지 버튼 생성
 */
Pagination.prototype.makePaginationHtml = function () {
    if (this.constructor !== Pagination) {
        throw Error('객체를 생성후 사용해 주세요!');
    }
    const {
        commentItems,
        currentPageIndex,
        maxPageItemCount,
    } = this;
    const count = Math.ceil(commentItems.length / maxPageItemCount);
    const buttons = [];
    for (let i = 0; i < count; i++) {
        buttons.push(
            i === currentPageIndex
                ? `<button class="active" data-index=${i}>${(i + 1)}</button>`
                : `<button data-index=${i}>${(i + 1)}</button>`
        )
    }
    return buttons.join('');
};

/**
 * 템플릿 랜더링
 */
Pagination.prototype.render = function () {
    if (this.constructor !== Pagination) {
        throw Error('객체를 생성후 사용해 주세요!');
    }
    const {
        commentContainerEl,
        paginationContainerEl
    } = this;
    if (commentContainerEl && paginationContainerEl) {
        commentContainerEl.innerHTML = this.makeCommentsHtml();
        paginationContainerEl.innerHTML = this.makePaginationHtml();
        return true;
    }
    return false;
};

Pagination.prototype.setCurrentPageIndex = function (pageIndex) {
    if (this.constructor !== Pagination) {
        throw Error('객체를 생성후 사용해 주세요!');
    }
    this.currentPageIndex = pageIndex;
    this.render();
}

document.addEventListener('DOMContentLoaded', () => {
    const commentContainerEl = document.querySelector('#commentContainer');
    const paginationContainerEl = document.querySelector('#pageContainer');
    /**
     * 페이지네이션 객체 인스턴스 생성
     */
    const pagination = new Pagination(
        commentContainerEl, paginationContainerEl, comments);
})

