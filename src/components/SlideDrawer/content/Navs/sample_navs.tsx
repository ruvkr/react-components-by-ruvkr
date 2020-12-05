import { v4 as uuid } from 'uuid';
import { NavitemsGroupI } from './types';
import {
  AtCircle,
  Bag,
  BarChart,
  ColorPalette,
  Dice,
  GameController,
  Home,
  Settings,
  Snow,
  Storefront,
  Tennisball,
  Trophy,
} from '../../../../assets/icons/essentials';

const mainNavs: NavitemsGroupI = {
  id: uuid(),
  name: 'Main',
  collapsable: false,
  items: [
    { id: uuid(), name: 'Home', icon: <Home /> },
    { id: uuid(), name: 'App Theme', icon: <ColorPalette /> },
    { id: uuid(), name: 'Settings', icon: <Settings /> },
    { id: uuid(), name: 'Messages', icon: <AtCircle /> },
  ],
};

const shopNavs: NavitemsGroupI = {
  id: uuid(),
  name: 'Shop',
  collapsable: false,
  items: [
    { id: uuid(), name: 'Store', icon: <Storefront /> },
    { id: uuid(), name: 'Bags', icon: <Bag /> },
    { id: uuid(), name: 'Offers', icon: <Trophy /> },
    { id: uuid(), name: 'Gifts', icon: <Snow /> },
  ],
};

const otherNavs: NavitemsGroupI = {
  id: uuid(),
  name: 'More',
  collapsable: true,
  collapsed: false,
  items: [
    { id: uuid(), name: 'Bar chart', icon: <BarChart /> },
    { id: uuid(), name: 'Dice', icon: <Dice /> },
    { id: uuid(), name: 'Game Controller', icon: <GameController /> },
    { id: uuid(), name: 'Tennis Ball', icon: <Tennisball /> },
  ],
};

export const sample_navs: NavitemsGroupI[] = [mainNavs, shopNavs, otherNavs];
