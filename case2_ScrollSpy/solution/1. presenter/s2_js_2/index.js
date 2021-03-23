import "./style.css";

const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);
const getOffsetTops = (() => {
  let ofst = 0;
  let res = [];
  return () => {
    if (window.innerHeight === ofst) {
      return res;
    }
    ofst = window.innerHeight;
    res = contentItems.map(elem => {
      const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
      return [ofs - clh / 2, ofs + clh / 2];
    });
    return res;
  };
})();

window.addEventListener("scroll", e => {
  const { scrollTop } = e.target.scrollingElement;
  const targetIndex = getOffsetTops().findIndex(([from, to]) => (
    scrollTop >= from && scrollTop < to
  ))
  Array.from(navElem.children).forEach((c, i) => {
    if (i !== targetIndex) c.classList.remove('on');
    else c.classList.add('on');
  })
});

navElem.addEventListener("click", e => {
  const targetElem = e.target;
  if (targetElem.tagName === "BUTTON") {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
});


/**
 * 
 <해설>

 화면 높이가 바뀌면 변경내용을 반영할 필요가 있다.
 
 */