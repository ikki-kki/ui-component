import "./style.css";
const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);
const offsetTops = contentItems.map((elem) => {
  const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
  // 자연스러움을 위해 절반쯤 왔을때로 잡음.
  return [ofs - clh / 2, ofs + clh / 2];
});

window.addEventListener("scroll", (e) => {
  // 브라우저에 스크롤 이벤트가 일어날 시 top 좌표를 찾음(즉 맨위)
  const { scrollTop } = e.target.scrollingElement;
  //1. index를 찾기
  const targetIndex = offsetTops.findIndex(
    ([from, to]) => scrollTop >= from && scrollTop < to,
  );
  //2. navElem의 children을 배열로 바꿔준다
  navItems.forEach((c, i) => {
    // 만약 li의 인덱스가 targetIndex와 다르다면 on클래스를 삭제
    if (i !== targetIndex) c.classList.remove("on");
    else c.classList.add("on");
  });
});

navElem.addEventListener("click", (e) => {
  const targetElem = e.target;
  // nodeName이랑 비교해도 상관 없음, 태그네임이 BUTTON일 경우에만
  if (targetElem.tagName === "BUTTON") {
    // navItem의 index를 찾는다. button의 parent는 li 즉 클릭한 버튼 상위 li의 index 찾기
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    //찾아낸 li의 인덱스를 contents에 접목시킨 후, scrollIntoView설정
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
});

//TODO: 배운것
// Array.from() : 유사 배열 객체(array-like object)나
// 반복 가능한 객체(iterable object)를 얕게 복사해 새로운 Array 객체를 만든다.
// offsetTop : body 높이 중에러 해당 element의 의 꼭대기 값의 위치 즉 Y좌표
// clientHeight : element의 height 값
// scrollIntoView{block: '가로세로의 영역', "behavior": '애니메이션 방식'}
// : 스크롤 해서 화면으로 보이게 하는 애니메이션을 주는 메서드
