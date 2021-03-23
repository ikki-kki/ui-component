const scrollBar = document.getElementById('scroll-bar');

window.addEventListener('scroll', function () {

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    // contentHeight : 눈에 보이지 않는 남은 범위
    const contentHeight = scrollHeight - clientHeight;
    const percent = (scrollTop / contentHeight) * 100;

    scrollBar.style.width = percent + '%';
})
