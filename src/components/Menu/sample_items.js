///<reference path="./Items.js" />
/** @typedef {import('./Items').MenuItem} MenuItem */

import React from 'react';

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

/** @type {MenuItem[]} */
export const menuItems = [
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
    isSubMenu: true,
    icon: <ListView />,
    items: [
      { name: 'Sub Upload file', icon: <Upload /> },
      { name: 'Sub Share with others', icon: <Share /> },
      { name: 'Sub Magnify', icon: <Magnifier /> },
      { name: 'Sub Bookmark this page', icon: <Bookmark /> },
      { name: 'Sub Cloud', icon: <Cloud />, disabled: true },
    ],
  },
  { name: 'Fevorite', icon: <Heart /> },
  { name: 'Download PDF', icon: <Document />, disabled: true },
  { name: 'Download this file', icon: <Download /> },
];
