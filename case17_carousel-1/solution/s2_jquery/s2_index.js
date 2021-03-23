function Carousel( carouselElement ){

  this.carouselElement = carouselElement;
  this.itemClassName = "carousel_item";
  this.items = this.carouselElement.children('.carousel_item');

  this.totalItems = this.items.length;
  this.current = 0;
  this.isMoving = false; 

}

Carousel.prototype.initCarousel = function(){

  this.isMoving = false; 

  this.items[this.totalItems - 1].classList.add("prev");
  this.items[0].classList.add("active");
  this.items[1].classList.add("next");

}

Carousel.prototype.setEventListeners = function(){

  this.prevButton = this.carouselElement.children('.carousel_button--prev');
  this.nextButton = this.carouselElement.children('.carousel_button--next');

  this.prevButton.click(() => {
    this.movePrev();
  })

  this.nextButton.click(() => {
    this.moveNext();
  })


}

Carousel.prototype.disableInteraction = function(){

  this.isMoving = true;
  setTimeout( () => {
    this.isMoving = false
  }, 500);
  
}

Carousel.prototype.moveCarouselTo = function() {

  
  if(!this.isMoving) {

  
    this.disableInteraction();

  
    var prev = this.current - 1,
        next = this.current + 1;

    if (this.current === 0) {
      prev = (this.totalItems - 1);
    } else if (this.current === (this.totalItems -1)) {
      next = 0;
    }

    if ((this.totalItems - 1) > 3) {


      for(var i=0 ;  i<this.totalItems  ; i++ ){

        if(i==this.current){
          this.items[i].className = this.itemClassName + " active";
        }else if(i==prev){
          this.items[i].className = this.itemClassName + " prev";
        }else if(i==next){
          this.items[i].className = this.itemClassName + " next";
        }else{
          this.items[i].className = this.itemClassName;
        }
      }

    }
    
  }
}

Carousel.prototype.moveNext = function() {
    
  if (!this.isMoving) {
    

    // If it's the last current, reset to 0, else +1
    if (this.current === (this.totalItems - 1)) {
      this.current = 0;
    } else {
      this.current++;
    }

    // Move carousel to updated current
    this.moveCarouselTo();

  }
}

Carousel.prototype.movePrev = function() {

  if (!this.isMoving) {

    // If it's the first current, set as the last current, else -1
    if (this.current === 0) {
      this.current = (this.totalItems - 1);
    } else {
      this.current--;
    }

    this.moveCarouselTo();
  }
}


$(document).ready(function(){

  var carouselElement = $('.carousel');
  var carousel = new Carousel(carouselElement);
  carousel.initCarousel();
  carousel.setEventListeners();

});
