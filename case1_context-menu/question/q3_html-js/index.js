// Write Javascript code here!
const items = document.querySelectorAll("details");

document.body.addEventListener("click", function (e) {
  if (e.target.nodeName !== "SUMMARY" && e.target.nodeName !== "P") {
    items.forEach(function (item) {
      item.removeAttribute("open");
    });
  }
  items.forEach(function (item) {
    // items는 details 이지만 실제로 클릭 이벤트가 발생한 곳은 "SUMMARY" 내에 발생
    if (item !== e.target.parentElement) {
      item.removeAttribute("open");
    }
  });
});

//TODO: 오늘 배운것
// e.target.nodeName은 태그네임을 대문자로 변경해서 return 한다
