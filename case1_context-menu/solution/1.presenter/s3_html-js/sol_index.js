// Import stylesheets
import "./style.css";

// Write Javascript code here!

const items = document.querySelectorAll('details');
document.body.addEventListener('click', function(e) {
  if (e.target.nodeName !== 'P' && e.target.nodeName !== 'SUMMARY') {
    items.forEach(function(item) {
      item.removeAttribute('open');
    });
    return;
  }
  items.forEach(function(item) {
    if (item !== e.target.parentElement) {
      item.removeAttribute('open');
    }
  });
});



/**
 * <해설>

HTML5의 details 태그를 활용하면 팝오버 오픈을 위한 처리를 자바스크립트가 관여하지 않아도 되므로 코드가 훨씬 간결해진다.

 */