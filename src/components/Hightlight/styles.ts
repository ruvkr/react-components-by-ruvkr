import { TextStyle } from './types';

export const colors = [
  '#eeeeee',
  '#222831',
  '#000000',
  '#fe2712',
  '#fd5308',
  '#fb9902',
  '#fabc02',
  '#f0f030',
  '#d0ea2b',
  '#66b032',
  '#0088aa',
  '#0247fe',
  '#3d01a4',
  '#8601af',
  '#a7194b',
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
