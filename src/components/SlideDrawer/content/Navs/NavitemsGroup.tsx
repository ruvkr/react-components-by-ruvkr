import { useState, useContext } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { motion, Variants } from 'framer-motion';

import { NavitemI } from './types';
import { Navitem } from './Navitem';
import { ChevronForward } from '../../../../assets/icons/essentials';
import { SDContext } from '../SDContent';

interface Props {
  name: string;
  collapsable?: boolean;
  collapsed?: boolean;
  items: NavitemI[];
}

export const NavitemsGroup: React.FC<Props> = ({
  collapsable = false,
  collapsed = false,
  items,
  name,
}) => {
  const [expanded, setExpanded] = useState(collapsable ? !collapsed : true);
  const { opened } = useContext(SDContext);
  const toggler = () => setExpanded(p => !p);
  const _items = items.map(({ id, ...rest }) => (
    <Navitem key={id} {...rest} focusable={opened && expanded} />
  ));

  return (
    <ScContainer>
      <ScHeading>
        <ScBar />
        <ScName>{name}</ScName>
        <ScBar />

        {collapsable && <ScExpandButtonBg />}
        {collapsable && (
          <ScExpandButton onClick={toggler} tabIndex={opened ? 0 : -1}>
            <ScFocus tabIndex={-1}>
              <ScArrowIcon
                initial={{ rotate: expanded ? 90 : 0 }}
                animate={{ rotate: expanded ? 90 : 0 }}
              >
                <ChevronForward />
              </ScArrowIcon>
            </ScFocus>
          </ScExpandButton>
        )}
      </ScHeading>
      <ScItemsContainer
        variants={variants}
        initial={expanded ? 'show' : 'hide'}
        animate={expanded ? 'show' : 'hide'}
      >
        {_items}
      </ScItemsContainer>
    </ScContainer>
  );
};

const variants: Variants = {
  hide: {
    height: 0,
    opacity: 0,
    transition: { type: 'spring', stiffness: 300, damping: 40 },
  },
  show: {
    height: 'auto',
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 40 },
  },
};

const ScContainer = styled.div`
  width: 100%;
`;

const ScHeading = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr auto;
  grid-template-rows: auto;
  align-items: center;
  position: relative;
  padding: 12px;
`;

const ScName = styled.div`
  color: ${p => p.theme.col2};
  padding: 0 8px;
`;

const ScBar = styled.div`
  height: 1px;
  background-color: ${p => rgba(p.theme.col2, 0.3)};
  width: 100%;
`;

const ScExpandButtonBg = styled.div`
  width: 52px;
  height: 20px;
  position: absolute;
  background-color: ${p => p.theme.col5};
  right: 0;
`;

const ScExpandButton = styled.button`
  position: absolute;
  font: inherit;
  border: none;
  width: 36px;
  height: 36px;
  padding: 0;
  display: flex;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 300ms ease-in-out;
  right: 8px;

  &:focus,
  &:active {
    outline: none;
    & > div {
      background-color: ${p => rgba(p.theme.col2, 0.2)};
      transition: background-color 300ms ease-in-out;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      & > div {
        background-color: ${p => rgba(p.theme.col2, 0.2)};
        transition: background-color 300ms ease-in-out;
      }
    }
  }
`;

const ScFocus = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  background-color: transparent;
  transition: background-color 300ms ease-in-out;

  &:focus,
  &:active {
    outline: none;
  }
`;

const ScArrowIcon = styled(motion.div)`
  width: 20px;
  height: 20px;
  transform-origin: center;
  fill: ${p => p.theme.col2};
  stroke: ${p => p.theme.col2};
  color: ${p => p.theme.col2};
`;

const ScItemsContainer = styled(motion.div)`
  width: 100%;
  overflow: hidden;
`;
