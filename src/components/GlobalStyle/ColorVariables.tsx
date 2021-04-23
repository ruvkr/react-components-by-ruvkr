import { createPortal } from 'react-dom';
import { createColorVariables } from './utils';
import { useConfigsStore, ConfigsStore } from '../../store/configs';

const getTheme = (state: ConfigsStore) => state.theme;

export const ColorVariables: React.FC = () => {
  const theme = useConfigsStore(getTheme);
  const colorVariables = createColorVariables(theme);
  return createPortal(<style>{`:root {${colorVariables}}`}</style>, document.head);
};
