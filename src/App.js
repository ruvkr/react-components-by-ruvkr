import React from 'react';
import styled from 'styled-components';

const App = () => {
  return <ScApp></ScApp>;
};

const ScApp = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default App;
