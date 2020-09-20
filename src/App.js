import React from 'react';
import styled from 'styled-components';
import { callers } from 'hooks-by-ruvkr';

import MenuViewer from './containers/MenuViewer/MenuViewer';
// import TestComponent from './containers/TestComponent/TestComponent';

const App = () => {
  return (
    <ScApp {...callers}>
      <MenuViewer />
      {/* <TestComponent /> */}
    </ScApp>
  );
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
