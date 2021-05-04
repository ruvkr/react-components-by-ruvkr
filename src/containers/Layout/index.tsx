import shallow from 'zustand/shallow';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { SDContent } from '../SDContent';
import { Pages } from '../../pages';
import { useUiStore, UiStore } from '../../store/ui';

const getUiState = (state: UiStore) => ({
  position: state.sdPosition,
  isMobile: state.isMobile,
});

export const Layout: React.FC = () => {
  const { isMobile, position } = useUiStore(getUiState, shallow);
  const isPeeking = position === 'top' || position === 'bottom' || !isMobile;

  return (
    <div className={clsx(styles.container, isPeeking && styles[position])}>
      <SDContent position={position} peek={isPeeking} />
      <Pages />
    </div>
  );
};
