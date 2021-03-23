// Import stylesheets
import "./style.css";
import $ from "jquery";

// Write JQuery code here!

// 1. 모범 답안
const $wrapper = $('.wrapper');
const $items = $wrapper.find('.item');
$wrapper.on('click', '.item', function(e) {
  e.stopPropagation();
  $(this).toggleClass('open').siblings().removeClass('open');
});
$('body').on('click', function(e) {
  $items.removeClass('open');
});


// 2. 리스너를 더 줄인 버전
const $items = $('.wrapper .item');
$('body').on('click', function(e) {
  const item = $(e.target);
  if (item.is('.item')) {
    item.toggleClass('open').siblings().removeClass('open');
  } else {
    $items.removeClass('open');
  }
});




/**
 * 
 
 <해설>

- javascript와 사실상 같은 구조.
- jquery의 ‘delegate target’에 대한 이해가 필요하다.
- 상황에 꼭 맞는 메서드들을 알고 있는지가 관건.

- 마찬가지로 이벤트 감시 대상을 줄일 방법은 없을지?

 */
