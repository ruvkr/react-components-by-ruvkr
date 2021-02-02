import styled from 'styled-components';
import { Home } from './containers/Home/Home';

export const App: React.FC = () => {
  return (
    <ScApp>
      <Home />
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
