import styles from './styles.module.scss';
import { ComponentItem } from './ComponentItem';
import { ShapesOutline } from '../../../assets/icons/essentials';

export const ComponentList: React.FC = () => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Components</label>
      <div className={styles.components}>{_components}</div>
    </div>
  );
};

const components = Array.apply(null, Array(6)).map((_, i) => i);
const _components = components.map(i => <ComponentItem key={i} icon={<ShapesOutline />} />);
