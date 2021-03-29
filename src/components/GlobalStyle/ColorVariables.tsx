import { createPortal } from 'react-dom';
import { Theme } from './types';
import { createColorVariables } from './utils';

const theme: Theme = {
  name: 'Default',
  colors: {
    background: '#1b2027',
    popup: '#0d1013',
    border: '#161a20',
    card: '#222831',
    hover: '#393e46',
    accent: '#0088aa',
    primary: '#d8d8d8',
    secondary: '#888888',
    disabled: '#393e46',
    interactive: '#0088aa',
    error: '#fa5456',
    success: '#48b14c',
    info: '#f78828',
  },
};

const colorVariables = createColorVariables(theme);
export const ColorVariables: React.FC = () => createPortal(<style>{`:root {${colorVariables}}`}</style>, document.head);
