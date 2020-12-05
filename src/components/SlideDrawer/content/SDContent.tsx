import { createContext } from 'react';
import styled from 'styled-components';
import { MotionValue } from 'framer-motion';

import { Profile } from './Profile';
import { Navs } from './Navs';
import { QuickSettings } from './QuickSettings';

interface Props {
  opened: boolean;
  progress: MotionValue<number>;
}

interface SDContextI {
  opened: boolean;
  progress: MotionValue<number>;
}

export const SDContext = createContext<SDContextI>({} as SDContextI);

export const SDContent: React.FC<Props> = ({ opened, progress }) => {
  return (
    <ScContainer>
      <SDContext.Provider value={{ opened, progress }}>
        <Profile />
        <Navs />
        <QuickSettings />
      </SDContext.Provider>
    </ScContainer>
  );
};

const ScContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
