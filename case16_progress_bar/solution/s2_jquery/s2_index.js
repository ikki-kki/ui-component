$(document).ready(function(){

  var current = 0;
  var limit = 4;

  $('#prev').click(function(){

    if( current  == 0 ) return;

    current--;

    $(".progress-bar > span").animate({
        width: 25 * current + '%'
    }, 500);

  });

  $('#next').click(function(){

    if( current  == limit ) return;

    current++;


    $(".progress-bar > span").animate({
        width: 25 * current + '%'
    }, 500);

  });

});


