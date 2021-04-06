import { v4 as uuid } from 'uuid';
import { PageItem } from './types';
import { HomePage } from './HomePage';
import { MenuPage } from './MenuPage';

export const pages: PageItem[] = [
  {
    id: uuid(),
    name: 'home',
    path: '/',
    component: HomePage,
  },
  {
    id: uuid(),
    name: 'menu',
    path: '/menu',
    component: MenuPage,
  },
];
