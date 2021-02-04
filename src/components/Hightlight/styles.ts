import { TextStyle } from './types';

export const colors = [
  'rgb(238, 238, 238)',
  'rgb(34, 40, 49)',
  'rgb(0, 0, 0)',
  'rgb(254, 39, 18)',
  'rgb(253, 83, 8)',
  'rgb(251, 153, 2)',
  'rgb(250, 188, 2)',
  'rgb(240, 240, 48)',
  'rgb(208, 234, 43)',
  'rgb(102, 176, 50)',
  'rgb(0, 136, 170)',
  'rgb(2, 71, 254)',
  'rgb(61, 1, 164)',
  'rgb(134, 1, 175)',
  'rgb(167, 25, 75)',
];

export const textStyles: TextStyle[] = [
  {
    id: 'bold',
    name: 'B',
    style: { fontWeight: 'bold' },
    itemStyle: { fontWeight: 'bold' },
  },
  {
    id: 'oblique',
    name: 'I',
    style: { fontStyle: 'oblique' },
    itemStyle: { fontStyle: 'oblique' },
  },
  {
    id: 'underline',
    name: 'U',
    style: { textDecorationLine: 'underline' },
    itemStyle: { textDecorationLine: 'underline' },
  },
  {
    id: 'overline',
    name: 'O',
    style: { textDecorationLine: 'overline' },
    itemStyle: { textDecorationLine: 'overline' },
  },
  {
    id: 'linethrough',
    name: 'S',
    style: { textDecorationLine: 'line-through' },
    itemStyle: { textDecorationLine: 'line-through' },
  },
  {
    id: 'undeover',
    name: 'T',
    style: { textDecorationLine: 'underline overline' },
    itemStyle: { textDecorationLine: 'underline overline' },
  },
  {
    id: 'dashed',
    name: 'D',
    style: { textDecorationStyle: 'dashed' },
    itemStyle: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'dashed',
    },
  },
  {
    id: 'wavy',
    name: 'W',
    style: { textDecorationStyle: 'wavy' },
    itemStyle: { textDecorationLine: 'underline', textDecorationStyle: 'wavy' },
  },
];
