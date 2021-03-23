import { Title, AnalogClock } from './components';
import GlobalStyles from './styles/global';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Title>Analog clock</Title>
      <AnalogClock />
    </>
  );
};

export default App;
