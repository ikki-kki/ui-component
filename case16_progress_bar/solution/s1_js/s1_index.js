function ProgressBar( targetElement ){

  this.targetElement = targetElement;
  this.current = 0;
  this.limit = 4;
  this.intervalSpeed = 10;
  this.range = 100 / this.limit;

}

ProgressBar.prototype.movePrev = function(){

    if( this.current  == 0 ) return;
  
    var start = this.current * this.range;
    this.current--;
    var end = this.current * this.range 

    var intervalId = setInterval(frame, this.intervalSpeed );

    var elem = this.targetElement;
    
    function frame() {
      if ( start <= end ) {
        clearInterval(intervalId);
      } else {
        start--;
        elem.style.width = start + "%";
      }
    }

}


ProgressBar.prototype.moveNext = function(){

  if( this.current  == this.limit ) return;
  
  var start = this.current * this.range;
  this.current++;
  var end = this.current * this.range;

  var intervalId = setInterval(frame, this.intervalSpeed );

  var elem = this.targetElement;
  
  function frame() {
    if ( start >= end ) {
      clearInterval(intervalId);
    } else {
      start++;
      elem.style.width = start + "%";
    }
  }


}


document.addEventListener("DOMContentLoaded", function(){

  var targetElement = document.querySelector('.progress-bar span')
  var progressBar = new ProgressBar(targetElement);

  document.querySelector('#prev').addEventListener('click' , function(){
    progressBar.movePrev();
  });

  document.querySelector('#next').addEventListener('click' , function(){
    progressBar.moveNext();
  });


});