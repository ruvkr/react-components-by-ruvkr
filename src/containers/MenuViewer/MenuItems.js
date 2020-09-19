import React from 'react';
import styled from 'styled-components';
import { Menu, MenuItem } from '../../components';

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

const menuItems = [
  { name: 'Upload file', icon: <Upload /> },
  { name: 'Share with others', icon: <Share /> },
  { name: 'Magnify', icon: <Magnifier /> },
  { name: 'Bookmark this page', icon: <Bookmark /> },
  { name: 'Cloud', icon: <Cloud />, disabled: true },
  { name: 'Back to home', icon: <Home /> },
  {
    name: 'Submenu',
    // subMenu: true,
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

const MenuItems = ({ items = menuItems }) => {
  const _items = items.map((item, index) => {
    if (item.subMenu)
      return (
        <MenuItem key={index}>
          <Menu
            name={item.name}
            disabled={item.disabled}
            isSubMenu
            icon={item.icon}
          >
            <MenuItems items={item.items} />
          </Menu>
        </MenuItem>
      );
    else
      return (
        <MenuItem key={index} disabled={item.disabled}>
          <ScItem $disabled={item.disabled}>
            <ScIcon>{item.icon}</ScIcon>
            <ScLabel>{item.name}</ScLabel>
          </ScItem>
        </MenuItem>
      );
  });

  return <ScItemsContainer>{_items}</ScItemsContainer>;
};

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

const ScItemsContainer = styled.div`
  background-color: ${props => props.theme.col5};
`;

export default MenuItems;
