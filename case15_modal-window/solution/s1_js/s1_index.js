
document.addEventListener("DOMContentLoaded", () => {
  
  const bodyBlackout = document.querySelector('.body-blackout')
  const popupModal = document.querySelector('.popup-modal')

  document.querySelector('.popup-trigger').addEventListener('click' , function(){
  
    popupModal.classList.add('is--visible')
    bodyBlackout.classList.add('is-blacked-out')

  });

  popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
    popupModal.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out')
 })

  bodyBlackout.addEventListener('click', () => {
    
    popupModal.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out')
  })

});
