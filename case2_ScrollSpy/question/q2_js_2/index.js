import "./style.css";
const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);

//! 화면 크기가 달라졌을 때
// 새로 체크를 하거나 아니면 비교를 할 때마다 최신상태를 확인 해줘야한다.
// 하지만 스크롤이벤트는 굉장히 자주 발생한다 어떻게 해야 성능을 개선 할 수 있을까?
//? 클로저를 이용하는 방법d이 있다.
// 클로저 : 자신을 포함하는 외부함수보다, 내부함수가 더 오래 유지되는 경우, 외부 함수 밖에서 내부 함수가
//        호출되더라도 외부함수의 지역 변수에 접근 할 수 있는것을 클로저라고 칭한다.
//        클로저가 가장 유용하게 사용되는 상황은 '현재 상태를 기억하고 변경된 최신 상태를 유지' 하는 것이다.
const getOffsetTops = (() => {
  // 1. offsetTop, res 변수가 즉시실행 함수로 생성됨
  let offsetTop = 0;
  let res = [];

  return () => {
    // 2. scrollEvent에서 매번 getOffsetTops()함수가 실행될 때 마다 해당 조건문만 비교할 것.
    if (window.innerHeight === offsetTop) {
      return res;
    }
    // 3. 만약 offsetHeight(화면의 세로크기)가 변경되었을땐 아래의 계산을 거친 후 res를 반환할 것.
    offsetTop = window.innerHeight;
    res = contentItems.map((elem) => {
      const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
      return [ofs - clh / 2, ofs + clh / 2];
    });
    return res;
  };
})(); //즉시 실행 함수로 한 번 호출

//TODO: 하지만 이것도 매번 계산을 하므로 좋지 않은 방법. 화면 resize를 확인하는 이벤트 리스너를 달아보자 다음강의에!!

window.addEventListener("scroll", (e) => {
  const { scrollTop } = e.target.scrollingElement;
  const targetIndex = getOffsetTops().findIndex(
    ([from, to]) => scrollTop >= from && scrollTop < to,
  );
  navItems.forEach((c, i) => {
    if (i !== targetIndex) c.classList.remove("on");
    else c.classList.add("on");
  });
});

navElem.addEventListener("click", (e) => {
  const targetElem = e.target;
  if (targetElem.tagName === "BUTTON") {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
});
