import { useState } from 'react';

function App() {
  const [images, setImages] = useState([
    '/img/movies/movie-1.jpg',
    '/img/movies/movie-2.jpg',
    '/img/movies/movie-3.jpg',
    '/img/movies/movie-4.jpg'
  ]);

  return (
    <>
      <label for="overflow">carousel <b>overflow: hidden</b></label>
      <input type="checkbox" id="overflow" checked />

      <h1 class="title">Carousel Slider</h1>
      <div class="carousel">
        {/* <div class="carousel-slides">
          <img src="movies/movie-4.jpg">
          <img src="movies/movie-1.jpg">
          <img src="movies/movie-2.jpg">
          <img src="movies/movie-3.jpg">
          <img src="movies/movie-4.jpg">
          <img src="movies/movie-1.jpg">
        </div>
        <button class="carousel-control prev">&laquo;</button>
        <button class="carousel-control next">&raquo;</button>  */}
      </div>
    </>
  );
}

export default App;

