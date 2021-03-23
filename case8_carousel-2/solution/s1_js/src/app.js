const carousel = ($container, images) => {
  // 현재 표시중인 슬라이드의 인덱스. 슬라이드의 인덱스가 0 또는 images.lenth + 1이면 클론 슬라이드다.
  let currentSlide = 0;
  // 현재 transition 중인지 여부
  let isMoving = false;
  // transiton duration(ms)
  const DURATION = 500;

  const timerId = null;
  let $carouselSlides = null;

  // currentSlide를 기준으로 carousel-slides 요소를 이동시킨다.
  const move = (currentSlide, duration = 0) => {
    // duration이 0이 아니면 transition이 시작된다. isMoving은 transionend 이벤트가 발생하면 false가 된다.
    if (duration) isMoving = true;
    $carouselSlides.style.setProperty('--duration', duration);
    $carouselSlides.style.setProperty('--currentSlide', currentSlide);
  };

  // Event bindings
  document.addEventListener('DOMContentLoaded', () => {
    // images 배열의 앞뒤에 클론 슬라이드를 추가한다.
    $container.innerHTML = `
      <div class="carousel-slides">
        ${[images[images.length - 1], ...images, images[0]].map(url => `<img src="${url}" />`).join('')}
      </div>
      <button class="carousel-control prev">&laquo;</button>
      <button class="carousel-control next">&raquo;</button>
    `;

    $carouselSlides = document.querySelector('.carousel-slides');
  });

  window.onload = () => {
    // carousel의 width 결정
    // img 요소의 width는 가변적이므로 첫번째 img 요소의 width를 offsetWidth으로 취득해 설정한다.
    const { offsetWidth } = $carouselSlides.querySelector('img');
    $container.style.width = `${offsetWidth}px`;
    $container.style.opacity = 1;

    move(++currentSlide);
    
    // Autoplay
    // timerId = setInterval(() => move(++currentSlide, DURATION), 3000);
  };

  $container.onclick = ({ target }) => {
    // isMoving 상태를 확인하여 transition 중에는 이동을 허용하지 않는다.
    if (!target.classList.contains('carousel-control') || isMoving) return;

    // clearInterval(timerId);

    // prev 버튼이 클릭되면 currentSlide를 -1하고 next 버튼이 클릭되면 currentSlide를 +1한다.
    const delta = target.classList.contains('prev') ? -1 : 1;
    currentSlide += 1 * delta;
    move(currentSlide, DURATION);
  };

  $container.ontransitionend = () => {
    isMoving = false;

    // currentSlide === 0, 즉 선두에 추가한 클론 슬라이드면 currentSlide += images.length로 image의 마지막(images.length)으로 이동
    // currentSlide === images.length + 1, 즉 마자막에 추가한 클론 슬라이드면 currentSlide -= images.length로 image의 선두(1)로 이동
    // 클론 슬라이드가 아니면 currentSlide += 0으로 이동하지 얺는다.
    const delta = currentSlide === 0 ? 1 : currentSlide === images.length + 1 ? -1 : 0;

    // 클론 슬라이드가 아니면(delta === 0) 이동하지 않는다.
    if (!delta) return;

    currentSlide += images.length * delta;
    move(currentSlide);
  };
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);