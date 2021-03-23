// Write Javascript code here!
const wrapper = document.querySelector(".wrapper");
const items = document.querySelectorAll(".item");

//바디에 이벤트 리스너를 건다
//이벤트리스너가 동작하고 있는지를 판단하여 조건을 건다
//조건에 따라 클래스를 붙여주고, 뗴준다

//? 하나의 이벤트 리스너 사용.
document.body.addEventListener("click", function (e) {
  const targetClassList = e.target.classList;
  if (targetClassList.contains("context")) return;
  if (targetClassList.contains("item")) {
    targetClassList.toggle("open");
    items.forEach(function (elem) {
      if (elem !== e.target) elem.classList.remove("open");
    });
    return;
  }
  items.forEach(function (elem) {
    elem.classList.remove("open");
  });
});

//? 이벤트 리스너는 적을수록 좋지만 아래의 예제에선 2개이다 위의 예제에선 하나로 줄인다.
//* eventListener는 가급적 최소화 하는 것이 좋다. 이벤트 버블/캡쳐링을 정확히 아는 것이 중요하다.
// wrapper.addEventListener("click", function (e) {
//   const targetElem = e.target;
//   console.dir(e);
//   body > wrapper이므로 stopPropagation으로 이벤트 버블링을 막았다
//   e.stopPropagation();
//   if (!targetElem.classList.contains("item")) return;
//   targetElem.classList.toggle("open");
//   items.forEach(function (elem) {
//     if (elem !== targetElem) elem.classList.remove("open");
//   });
// });

//* wrapper외의 다른 부분을 클릭하면 팝업이 닫히도록 body에 이벤트 추가
// document.body.addEventListener("click", function (e) {
//   if (e.target.classList.contains("context")) return;
//   items.forEach(function (elem) {
//     elem.classList.remove("open");
//   });
// });

//---------------------------------------------------------------

//? 이렇게 짜면 동작은 하지만 각각의 이벤트 리스너가 너무 많이 달려있어서 성능 저하가 된다.
// items.forEach(function (item) {
//   item.addEventListener("click", function (e) {
//     item.classList.toggle("open");
//     items.forEach(function (elem) {
//       if (elem !== item) elem.classList.remove("open");
//     });
//   });
// });
// const context = document.querySelector(".context");

//TODO: 오늘 배운것
// .classList를 이용하면 클래스를 조작하는 다양한 메서드들을 쓸 수 있다.
// classList.add : 클래스에 필요에 따라 삽입한다.
// classList.remove: 클래스를 필요에 따라 제거한다
