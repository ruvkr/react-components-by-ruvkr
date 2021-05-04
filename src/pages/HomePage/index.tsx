import styles from './styles.module.scss';
// import { components } from './components';
// import { ComponentItem } from './ComponentItem';

export const HomePage: React.FC = () => {
  // const _components = components.map(({ id, path, ...rest }) => (
  //   <ComponentItem
  //     {...rest}
  //     key={id}
  //     disabled={false}
  //     onClick={() => window.history.pushState(undefined, '', path)} //
  //   />
  // ));

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Components</h1>
      <p className={styles.details}>
        Awesome React components. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste illo, sed repellendus
        tempore quidem accusantium nesciunt voluptate asperiores incidunt aliquid molestias. Veniam quisquam iusto
        pariatur eum optio qui ea ad?
      </p>
      {/* <div className={styles.itemscontainer}>{_components}</div> */}
    </div>
  );
};
