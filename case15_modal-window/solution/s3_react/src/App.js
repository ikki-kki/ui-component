import { useState } from 'react';
import BodyBlackout from './BodyBlackout';
import Modal from './Modal';

function App() {

  const [ isVisible , setIsVisible ] = useState(false);

  const onSetIsVisible = (active) => { 
    setIsVisible(active);
  }

  return (
    <div className="App">
      
      <BodyBlackout isVisible={isVisible} onSetIsVisible={onSetIsVisible} />
      <Modal isVisible={isVisible} onSetIsVisible={onSetIsVisible} />

      <button
        type="button"
        className="btn btn-sm btn-primary" onClick={ () => onSetIsVisible(true) } >
        팝업을 엽니다.
      </button>

      

    </div>
  );
}

export default App;
