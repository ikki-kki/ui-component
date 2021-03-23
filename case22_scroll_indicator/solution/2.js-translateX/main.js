const scrollBar = document.getElementById('scroll-bar');


window.addEventListener('scroll', function () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    const contentHeight = scrollHeight - clientHeight;
    const percent = (scrollTop / contentHeight) * 100;

    scrollBar.style.transform = `translateX(-${100 - percent}%)`;
    scrollBar.style.transition = 'transform 0.3s ease-out';
    
})
