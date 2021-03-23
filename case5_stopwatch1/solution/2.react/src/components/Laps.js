import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr;
  column-gap: 50px;
  row-gap: 10px;
  width: 260px;
  margin: 10px auto;
  font-size: 0.5em;
`;

const Laps = ({ laps }) => (
  <Container>
    <div>Laps</div>
    <div>Time</div>
    {laps.map((elapsedTime, i) => (
      <React.Fragment key={i}>
        <div>{i + 1}</div>
        <div>{elapsedTime}</div>
      </React.Fragment>
    ))}
  </Container>
);

export default Laps;
