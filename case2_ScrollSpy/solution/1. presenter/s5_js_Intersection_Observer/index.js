import "./style.css";

const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);

const scrollSpyObserver = new IntersectionObserver(
  entries => {
    // do something
    const { target } = entries.find((entry) => entry.isIntersecting) || {};
    const index = contentItems.indexOf(target);
    Array.from(navElem.children).forEach((c, i) => {
      if (i === index) c.classList.add('on');
      else c.classList.remove('on');
    })
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
  }
);
contentItems.forEach(item => scrollSpyObserver.observe(item));

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
