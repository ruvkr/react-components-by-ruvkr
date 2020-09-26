import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { motion } from 'framer-motion';
import { Menu } from '../../components';

const MenuViewer = () => {
  return (
    <ScContainer>
      <ScDragable drag dragMomentum={false}>
        <Menu name='Menu' />
      </ScDragable>
    </ScContainer>
  );
};

const ScDragable = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%; 
  position: fixed;
  top: 50px;
  left: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.col5};
  box-shadow: 0 0 8px ${rgba('#000', 0.2)};
  cursor: grab;
`;

const ScContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default MenuViewer;
