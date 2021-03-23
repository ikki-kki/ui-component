
import { useState , useRef } from 'react';
import ProgressBar from './ProgressBar';
import Button from './Button';

function App() {
  
  const [ current , setCurrent ] = useState(0);
  const limit = 4;
  const range = 100 / limit;
  const isLoading = useRef(false);
  const animationSpeed = 1000;

  const delay = ( delay ) => {
    isLoading.current = true;
    return new Promise( () => 
      setTimeout( 
        () => isLoading.current = false
        , delay ) 
    );
  }


  const handleNext = async() => {

    if( isLoading.current ) return;
    if( current  === limit ) return;
    setCurrent( current + 1 );
    await delay(animationSpeed);

  }

  const handlePrev = async() => {

    if( isLoading.current ) return;
    if( current  === 0 ) return;
    setCurrent( current - 1 );
    await delay(animationSpeed);

  }



  return (
    <div>

      <ProgressBar width={ current * range } animationSpeed={animationSpeed}/>

      <br />
      <br />


      <Button text={'이전'} onClick={handlePrev}/>
      <Button text={'다음'} onClick={handleNext}/>

    </div>
  );
}

export default App;
