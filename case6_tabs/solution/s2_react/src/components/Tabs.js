import { useState } from 'react';

import Spinner from './Spinner';
import useFetchTabsData from '../hooks/useFetchTabsData';
import styled from 'styled-components';

const Container = styled.div`
  --tab-width: 200;
  width: calc(var(--tab-width) * ${({ tabsLength }) => tabsLength} * 1px);
  margin: 0 auto;
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14),
    0 5px 24px 4px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  overflow: hidden;
`;

const Nav = styled.nav`
  display: flex;
  position: relative;
  background-color: #f2f2f2;
`;

const Tab = styled.div`
  width: calc(var(--tab-width) * 1px);
  height: 60px;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
  transition: color 0.15s ease-in;
  z-index: 1000;
`;

const Glider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  width: calc(var(--tab-width) * 1px);
  background-color: #fff;
  transition: 0.25s ease-out;
  transform: translate3D(${props => props.currentIndex * 100}%, 0, 0);
`;

const TabContent = styled.div`
  min-height: 300px;
  line-height: 2.5;
  background-color: #fff;
  padding: 20px;
`;

const Tabs = () => {
  const [currentIndex, setCurrentindex] = useState(0);
  const { tabsData, isLoading } = useFetchTabsData();

  if (isLoading) return <Spinner />;
  if (!tabsData) return null;

  return (
    <Container tabsLength={tabsData.length}>
      <Nav>
        {tabsData.map(({ title }, i) => (
          <Tab key={i} onClick={() => setCurrentindex(i)}>
            {title}
          </Tab>
        ))}
        <Glider currentIndex={currentIndex} />
      </Nav>
      {tabsData.map(({ content }, i) =>
        i === currentIndex ? <TabContent key={i}>{content}</TabContent> : null
      )}
    </Container>
  );
};

export default Tabs;
