import styled, { css } from 'styled-components';
import styles from './componentitem.module.scss';
import { ComponentItemType } from './types';

export interface ComponentItemProps extends Omit<ComponentItemType, 'id' | 'path'> {
  disabled?: boolean;
  onClick?: () => void;
}

export const ComponentItem: React.FC<ComponentItemProps> = ({
  name,
  title,
  onClick,
  disabled,
  imageSrc,
  highlights,
}) => {
  const _highlights = highlights && (
    <ul className={styles.highlight}>
      {highlights.map((h, i) => (
        <li key={i}>{h}</li>
      ))}
    </ul>
  );

  return (
    <button className={styles.item} onClick={onClick} disabled={disabled} title={title ?? name}>
      <div tabIndex={-1} className={styles.focus}>
        <ScImage $imageSrc={imageSrc} src={imageSrc} className={styles.image}></ScImage>
        <div className={styles.info}>
          <div className={styles.name}>{name}</div>
          {_highlights}
        </div>
      </div>
    </button>
  );
};

const ScImage = styled.img<{ $imageSrc?: string }>(p => {
  if (p.$imageSrc) {
    return css`
      /* background-image: url('${p.$imageSrc}'); */
      /* background-position: center; */
      /* background-size: cover; */
      /* background-repeat: no-repeat; */
    `;
  }
});
