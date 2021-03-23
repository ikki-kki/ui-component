const $nav = $('nav');

// 스크롤 위치를 기준으로 적용
/*
$(window).scroll(function () {
    const $top = $(this).scrollTop();
    ($top >= 50 )
        ? $nav.addClass('active')
        : $nav.removeClass('active');
});
*/





// 마우스 휠 방향을 기준으로 적용
/*
$(window).on('mousewheel DOMMouseScroll', function(e) {
    const delta = e.originalEvent.wheelDelta
        ? e.originalEvent.wheelDelta
        : -e.originalEvent.detail;

    (delta < 0)
        ? $nav.addClass('active')
        : $nav.removeClass('active');
});
*/