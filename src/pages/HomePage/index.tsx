import styles from './styles.module.scss';
import { components } from './components';
import { ComponentItem } from './ComponentItem';

export const HomePage: React.FC = () => {
  const _components = components.map(({ id, path, ...rest }) => (
    <ComponentItem
      {...rest}
      key={id}
      disabled={false}
      onClick={() => window.history.pushState(undefined, '', path)} //
    />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Components</div>
      <div className={styles.itemscontainer}>{_components}</div>
    </div>
  );
};
