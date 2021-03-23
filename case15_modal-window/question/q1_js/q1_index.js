
document.addEventListener("DOMContentLoaded", () => {
  
  const bodyBlackout = document.querySelector('.body-blackout')
  const popupModal = document.querySelector('.popup-modal')

  // css 를 참고하세요.
  document.querySelector('.popup-trigger').addEventListener('click' , function(){
    // 팝업 열기를 클릭했을 때 모달을 띄우도록 구현하세요.onSetIsVisible
    

  });

  popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
    // 닫기 버튼을 눌렀을 때 작동하도록 구현하세요.

 })

  bodyBlackout.addEventListener('click', () => {
    // 모달 바탕을 클릭 했을 때 작동하도록 구현하세요.

  })

});
