import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleContainer = styled.div`
  position: relative;
  width: 100px;
  height: 50px;
  margin: 0 auto;
  cursor: pointer;
`;

const ToggleSwitch = styled.div`
  position: absolute;
  top: 2px;
  /* ThemeProvider의 theme props가 전달된다. */
  /* left: ${({ theme }) => theme.toggleButtonSwitchLeft}; */
  left: ${(props) => props.theme.toggleButtonSwitchLeft};
  width: 46px;
  height: 46px;
  background-color: #fff;
  border-radius: 100%;
  transition: left 0.3s;
`;

const ToggleText = styled.div`
  display: flex;
  /* ThemeProvider의 theme props가 전달된다. */
  /* background-color: ${({ theme }) => theme.toggleButtonTextColor}; */
  background-color: ${(props) => props.theme.toggleButtonTextColor};
  border-radius: 25px;
  box-shadow: 2px 2px 5px 0 rgba(50, 50, 50, 0.75);
  transition: background-color 0.3s;
`;

const ToggleIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50px;
  color: #fff;
`;

const ToggleButton = ({ onClick: toggleTheme }) => {
  return (
    <ToggleContainer onClick={toggleTheme}>
      <ToggleSwitch />
      <ToggleText>
        <ToggleIcon>
          <FaSun size="24" />
        </ToggleIcon>
        <ToggleIcon>
          <FaMoon size="24" />
        </ToggleIcon>
      </ToggleText>
    </ToggleContainer>
  );
};

export default ToggleButton;
