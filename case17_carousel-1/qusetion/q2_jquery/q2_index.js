function Carousel( carouselElement ){

  // Carousel 컨테이너를 의미
  this.carouselElement = carouselElement;

  // 슬라이드의 class 명
  this.itemClassName = "carousel_item";

  // write jQuery 셀렉터로 아랫부분을 대체한다.
  // Do Something Here!
  this.items = this.carouselElement.querySelectorAll('.carousel_item');
  
  // 슬라이드의 길이
  this.totalItems = this.items.length;

  // 현재 슬라이드 위치
  this.current = 0;

  // 슬라이드가 움직이고 있는지 체크
  this.isMoving = false; 

}

Carousel.prototype.initCarousel = function(){

  this.isMoving = false; 

  this.items[this.totalItems - 1].classList.add("prev");
  this.items[0].classList.add("active");
  this.items[1].classList.add("next");

}

Carousel.prototype.setEventListeners = function(){

  // jquery selector로 대체한다.
  // Do Something Here!
  this.prevButton = this.carouselElement.querySelector('.carousel_button--prev');
  this.nextButton = this.carouselElement.querySelector('.carousel_button--next');

  // Do Something Here!


}

Carousel.prototype.disableInteraction = function(){

  // 0.5 초 동안은 isMoving : true
  // Do Something Here!
  
  
}

Carousel.prototype.moveCarouselTo = function() {

  
  if(!this.isMoving) {

  
    this.disableInteraction();

  
    var prev = this.current - 1,
        next = this.current + 1;

    // 현재 슬라이드가 0 이면 prev 이전슬라이드는 맨 마지막 슬라이드
    // 현재 슬라이드가 마지막이면 next 다음슬라이드는 0번째 슬라이드
    // Do Something Here!

    if ((this.totalItems - 1) > 3) {

      // 클래스명 작성
      // 현재 슬라이드에 active
      // 이전 슬라이드에 prev
      // 다음 슬라이드에 next
      // Do Something Here!
      

    }

    
  }
}

Carousel.prototype.moveNext = function() {
    
  if (!this.isMoving) {
    

    // 현재위치가 마지막이면0, 아니면 현재위치 증가
    // Do Something Here!

    // Move carousel to updated current

    
    this.moveCarouselTo();

  }
}

Carousel.prototype.movePrev = function() {

  if (!this.isMoving) {
    
    // 현재위치가 처음이면 마지막으로, 아니면 현재위치 감소
    // Do Something Here!

    this.moveCarouselTo();
  }
}


$(document).ready(function(){

  // write 아랫부분을 jquery로 바꾼다
  var carouselElement = document.querySelector('.carousel');

  var carousel = new Carousel(carouselElement);
  carousel.initCarousel();
  carousel.setEventListeners();

});
