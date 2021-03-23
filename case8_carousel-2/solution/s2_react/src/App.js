import { useState } from 'react';

import Carousel from './components/Carousel';
import Title from './components/Title';
import GlobalStyle from './styles/global';

function App() {
  const [images, setImages] = useState([
    '/img/movies/movie-1.jpg',
    '/img/movies/movie-2.jpg',
    '/img/movies/movie-3.jpg',
    '/img/movies/movie-4.jpg'
  ]);

  return (
    <>
      <GlobalStyle />
      <Title>Carousel Slider</Title>
      <Carousel images={images} />
    </>
  );
}

export default App;
