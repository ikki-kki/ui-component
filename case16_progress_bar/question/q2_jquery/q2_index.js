$(document).ready(function(){

  var current = 0; // 현재 스텝의 위치
  var limit = 4; //총 스텝의 길이

  $('#prev').click(function(){

    // progressbar가 아무것도 없으면 함수 종료
    if( current  == 0 ) return;

    current--;

    // Write JQ Code Here!


  });

  $('#next').click(function(){

    // progressbar가 꽉차 있으면 함수 종료
    if( current  == limit ) return;

    current++;

    // Write JQ Code Here!


  });

});


