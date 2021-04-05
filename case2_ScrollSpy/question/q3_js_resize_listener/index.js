import "./style.css";

const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);

let offsetTops = [];
const getOffsetTops = () => {
  offsetTops = contentItems.map((elem) => {
    const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
    return [ofs - clh / 2, ofs + clh / 2];
  });
};
// 이상태로 최초에 한 번만 함수를 실행해준다.
getOffsetTops();

window.addEventListener("scroll", (e) => {
  const { scrollTop } = e.target.scrollingElement;
  const targetIndex = offsetTops.findIndex(
    ([from, to]) => scrollTop >= from && scrollTop < to,
  );
  navItems.forEach((c, i) => {
    if (i !== targetIndex) c.classList.remove("on");
    else c.classList.add("on");
  });
});

//! resize에 관한 이벤트 리스너 작성
window.addEventListener("resize", getOffsetTops());

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
