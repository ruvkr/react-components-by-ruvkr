import { useRef } from 'react';
import styled from 'styled-components';
import { Home } from './containers/Home/Home';
import { SideDrawer } from './components/SlideDrawer';

export const App: React.FC = () => {
  const appRef = useRef<HTMLDivElement>(null);

  return (
    <ScApp ref={appRef}>
      <Home />
      <SideDrawer appRef={appRef} />
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
