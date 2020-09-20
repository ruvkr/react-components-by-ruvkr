import React, { useReducer } from 'react';
import styled from 'styled-components';
// import { motion } from 'framer-motion';
// import { MenuItem } from './MenuItem';

import {
  Upload,
  Share,
  Magnifier,
  Bookmark,
  Cloud,
  Home,
  Heart,
  Document,
  Download,
  ListView,
} from '../../assets/icons/essential';

export const MenuItems = ({ items = menuItems }) => {
  const [state, dispatch] = useReducer(reducer, { activeItems: items });
  const { activeItems } = state;

  const clickHandler = item => {
    if (!item.disabled) {
      if (item.subMenu && item.items) dispatch({ activeItems: item.items });
      else if (item.onClick) item.onClick();
    }
  };

  const _items = activeItems.map((item, index) => {
    return (
      <ScItem
        key={index}
        onClick={() => clickHandler(item)}
        $disabled={item.disabled}
      >
        <ScIcon>{item.icon}</ScIcon>
        <ScLabel>{item.name}</ScLabel>
      </ScItem>
    );
  });

  return <ScItemsContainer>{_items}</ScItemsContainer>;
};

const reducer = (state, payload) => ({ ...state, ...payload });

const ScIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 12px;
  fill: ${props => props.theme.col2};
`;

const ScLabel = styled.div`
  color: ${props => props.theme.col1};
`;

const ScItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  opacity: ${props => (props.$disabled ? 0.2 : 1)};
`;

const ScItemsContainer = styled.div``;

const menuItems = [
  { name: 'Upload file', icon: <Upload /> },
  { name: 'Share with others', icon: <Share /> },
  {
    name: 'Magnify',
    icon: <Magnifier />,
    onClick: () => console.log('magnify'),
  },
  { name: 'Bookmark this page', icon: <Bookmark /> },
  {
    name: 'Cloud',
    icon: <Cloud />,
    disabled: true,
    onClick: () => console.log('cloud'),
  },
  { name: 'Back to home', icon: <Home /> },
  {
    name: 'Submenu',
    subMenu: true,
    icon: <ListView />,
    items: [
      { name: 'Upload file', icon: <Upload /> },
      { name: 'Share with others', icon: <Share /> },
      { name: 'Magnify', icon: <Magnifier /> },
      { name: 'Bookmark this page', icon: <Bookmark /> },
      { name: 'Cloud', icon: <Cloud />, disabled: true },
    ],
  },
  { name: 'Fevorite', icon: <Heart /> },
  { name: 'Download PDF', icon: <Document />, disabled: true },
  { name: 'Download this file', icon: <Download /> },
];
