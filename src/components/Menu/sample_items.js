///<reference path="./Items.js" />
/** @typedef {import('./Items').MenuItem} MenuItem */

import React from 'react';
import { getRandomString } from '../../libs';

import {
  Upload,
  Share,
  // Magnifier,
  Bookmark,
  Cloud,
  // Home,
  // Heart,
  Document,
  // Download,
  ListView,
  Font,
  Clock,
  Expand,
} from '../../assets/icons/essential';

/** @type {MenuItem[]} */
export const menuItems = [
  {
    id: getRandomString(10),
    name: 'Upload file',
    icon: <Upload />,
  },
  {
    id: getRandomString(10),
    name: 'Share with others', 
    icon: <Share />,
  },
  // {
  //   id: getRandomString(10),
  //   name: 'Magnify',
  //   icon: <Magnifier />,
  //   onClick: () => console.log('magnify'),
  // },
  {
    id: getRandomString(10),
    name: 'Bookmark this page',
    icon: <Bookmark />,
  },
  {
    id: getRandomString(10),
    name: 'Cloud',
    icon: <Cloud />,
    disabled: true,
    onClick: () => console.log('cloud'),
  },
  // {
  //   id: getRandomString(10),
  //   name: 'Back to home',
  //   icon: <Home />,
  // },
  {
    id: getRandomString(10),
    name: 'Sort by',
    isSubMenu: true,
    icon: <ListView />,
    items: [
      {
        id: getRandomString(10),
        name: 'File name',
        icon: <Font />,
      },
      {
        id: getRandomString(10),
        name: 'Date created',
        icon: <Clock />,
      },
      {
        id: getRandomString(10),
        name: 'Date Modified',
        icon: <Clock />,
      },
    ],
  },
  // {
  //   id: getRandomString(10),
  //   name: 'Fevorite',
  //   icon: <Heart />,
  // },
  {
    id: getRandomString(10),
    name: 'Download PDF',
    icon: <Document />,
    disabled: true,
  },
  // {
  //   id: getRandomString(10),
  //   name: 'Download this file',
  //   icon: <Download />,
  // },
  {
    id: getRandomString(10),
    name: 'Deep submenu',
    isSubMenu: true,
    icon: <Expand />,
    items: [
      {
        id: getRandomString(10),
        name: 'Option',
        icon: <Expand />,
      },
      {
        id: getRandomString(10),
        name: 'Another option',
        icon: <Expand />,
      },
      {
        id: getRandomString(10),
        name: 'Deep',
        icon: <Expand />,
        isSubMenu: true,
        items: [
          {
            id: getRandomString(10),
            name: 'Deep option 1',
            icon: <Expand />,
          },
          {
            id: getRandomString(10),
            name: 'Deep option 2',
            icon: <Expand />,
          },
          {
            id: getRandomString(10),
            name: 'Deep option 3',
            icon: <Expand />,
          },
        ],
      },
    ],
  },
];
