import { useRef } from 'react';
import styles from './styles.module.scss';
import { SDContent } from '../SDContent';
import { Pages } from '../../pages';

export const Layout: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={targetRef} className={styles.container}>
      <SDContent targetRef={targetRef} />
      <Pages />
    </div>
  );
};
