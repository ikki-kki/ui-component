import { Title, ToggleButton, Article } from './components';
import { useTheme } from './hooks';
import { GlobalStyle, themeStyle } from './styles';

import { ThemeProvider } from 'styled-components';

const App = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <ThemeProvider theme={themeStyle[theme]}>
      <GlobalStyle />
      <Title>Light / Dark Mode - Toggle Button</Title>
      <ToggleButton onClick={toggleTheme} />
      <Article>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum optio ab porro magni in sunt ipsam,
        doloremque minima, itaque sapiente consequatur, repellat velit voluptatum accusantium aperiam. Nostrum
        sunt reprehenderit nemo!
      </Article>
    </ThemeProvider>
  );
};

export default App;
