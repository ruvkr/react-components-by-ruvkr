import styled from 'styled-components';
import { rgba } from 'polished';
import { motion } from 'framer-motion';
import { Menu } from '../../components/Menu';
import { menuItems } from './sample_items';

export const Home: React.FC = () => {
  return (
    <ScContainer>
      <ScDragable drag dragMomentum={false}>
        <Menu items={menuItems} />
      </ScDragable>
    </ScContainer>
  );
};

const ScContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScDragable = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: fixed;
  bottom: 50px;
  right: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.col5};
  box-shadow: 0 0 8px ${rgba('#000', 0.2)};
  cursor: grab;
`;
