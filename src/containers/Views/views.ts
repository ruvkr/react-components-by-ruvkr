import { v4 as uuid } from 'uuid';
import { ViewItem } from './types';
import { Home } from '../Home';
import { MenuView } from '../MenuView';

export const views: ViewItem[] = [
  {
    id: uuid(),
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    id: uuid(),
    name: 'menu',
    path: '/menu',
    component: MenuView,
  },
];
