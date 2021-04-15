import { OptionItem } from './types';
import { BlockButton } from '../Buttons';
import styles from './items.module.scss';

interface Props {
  items: OptionItem[];
  onClick: () => void;
}

export const Items: React.FC<Props> = ({ items, onClick }) => {
  const clickHandler = (item: OptionItem) => () => {
    if (typeof item !== 'object' || item.disabled) return;
    if (item.onClick) item.onClick();
  };

  const _items = items.map((item, index) => {
    if (typeof item !== 'object') return <div key={index} className={styles.devider} />;

    return (
      <div key={item.id} className={styles.item}>
        <BlockButton
          icon={item.icon}
          name={item.name}
          title={item.title}
          onClick={clickHandler(item)}
          disabled={item.disabled}
        />
      </div>
    );
  });

  return <div className={styles.container}>{_items}</div>;
};
