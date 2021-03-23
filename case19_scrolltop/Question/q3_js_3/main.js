const isFireFox = (navigator.userAgent.indexOf('Firefox') !== -1);
const wheelEvt = isFireFox ? 'DOMMouseScroll' : 'wheel';
window.addEventListener(wheelEvt, mouseWheelEvent);

// 세 번째 방법

// 스크롤 이벤트가 발생했을 때

    // 현재 스크롤 위치를 가져온다.
    // 스크롤 위치를 바탕으로 active 클래스를 추가하거나 제거한다.

function mouseWheelEvent(e) {
    // Write JS Code Here!

}