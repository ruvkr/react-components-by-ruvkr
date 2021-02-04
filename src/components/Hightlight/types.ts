import * as CSS from 'csstype';

export type TextStyle = {
  id: string;
  name: string;
  style: CSS.Properties<string>;
  itemStyle: CSS.Properties<string>;
};
