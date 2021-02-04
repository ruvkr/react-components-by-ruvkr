import * as CSS from 'csstype';
import objectToCss from 'react-style-object-to-css';
import cssToObject from 'style-to-js';

export function convertStyle(
  mode: 'toCss',
  styles: CSS.Properties<string>
): string;

export function convertStyle(
  mode: 'toObject',
  styles: string
): CSS.Properties<string>;

export function convertStyle(
  mode: 'toCss' | 'toObject',
  styles: CSS.Properties<string> | string
): CSS.Properties<string> | string {
  if (mode === 'toCss') return objectToCss(styles);
  else return cssToObject(styles as string);
}