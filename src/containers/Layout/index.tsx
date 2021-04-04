import { useRef } from 'react';
import styles from './styles.module.scss';
import { SDView } from '../SDView';
import { Views } from '../Views';

export const Layout: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={targetRef} className={styles.container}>
      <SDView targetRef={targetRef} />
      <Views />
    </div>
  );
};
