import "./style.css";

const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);

let offsetTops = [];
const getOffsetTops = () => {
  // do something
  offsetTops = contentItems.map(elem => {
    const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
    return [ofs - clh / 2, ofs + clh / 2];
  });
};
getOffsetTops();

window.addEventListener("scroll", e => {
  const { scrollTop } = e.target.scrollingElement;
  const targetIndex = offsetTops.findIndex(([from, to]) => (
    scrollTop >= from && scrollTop < to
  ))
  Array.from(navElem.children).forEach((c, i) => {
    if (i !== targetIndex) c.classList.remove('on');
    else c.classList.add('on');
  })
});

window.addEventListener("resize", getOffsetTops);

navElem.addEventListener("click", e => {
  const targetElem = e.target;
  if (targetElem.tagName === "BUTTON") {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  }
});



/**
 * 
 <해설>

2의 함수는 리사이즈가 있을 때엔 의미가 있으나, 그렇지 않은 경우에도 스크롤할 때마다 함수가 실행되면서 각 엘리먼트의 높이를 구하게 된다.
이보다는 리사이즈시에만 계산을 하고, 평소에는 미리 계산된 값을 이용하는게 효율적일 것이다.

 */