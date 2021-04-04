import clsx from 'clsx';
import styled, { css } from 'styled-components';
import styles from './positionswitch.module.scss';
import { Position } from '../../components/SlideDrawer';
import { ChevronBack, ChevronForward, ChevronUp, ChevronDown } from '../../assets/icons/essentials';
import { IconButton, iconButtonClasses as ics } from '../../components/Buttons';

export interface PositionSwitchProps {
  position: Position;
  onChange?: (postition: Position) => void;
}

const sides: { position: Position; name: string; icon: JSX.Element }[] = [
  { position: 'left', name: 'Left', icon: <ChevronBack /> },
  { position: 'right', name: 'Right', icon: <ChevronForward /> },
  { position: 'top', name: 'Top', icon: <ChevronUp /> },
  { position: 'bottom', name: 'Bottom', icon: <ChevronDown /> },
];

export const PositionSwitch: React.FC<PositionSwitchProps> = ({ position, onChange }) => {
  const _sides = sides.map(s => (
    <div key={s.position} className={clsx(styles.side, styles[s.position])}>
      <ScIconButton $active={position === s.position} icon={s.icon} onClick={() => onChange && onChange(s.position)} />
      <label className={styles.label}>{s.name}</label>
    </div>
  ));

  return (
    <div className={styles.container}>
      <label className={styles.heading}>Side Drawer position</label>
      <div className={styles.base}>{_sides}</div>
    </div>
  );
};

const ScIconButton = styled(IconButton)<{ $active: boolean }>(({ $active }) => {
  const iconColor = $active ? 'card' : 'accent';
  const bgColor = $active ? 'accent' : 'card';
  return css`
    border-radius: 0;
    overflow: visible;

    .${ics.focus} {
      border-radius: 8px;
      overflow: visible;
      background-color: var(--${bgColor});
    }

    .${ics.icon} {
      color: var(--${iconColor});
      fill: var(--${iconColor});
      stroke: var(--${iconColor});
      transition: all 300ms ease-in-out;
    }

    &:focus,
    &:active {
      outline: none;
      .${ics.focus} {
        background-color: var(--${bgColor});
        box-shadow: 0 0 0 2px var(--accent);
        transition: box-shadow 300ms ease-in-out;
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:disabled) {
        .${ics.focus} {
          background-color: var(--${bgColor});
          box-shadow: 0 0 0 2px var(--accent);
          transition: box-shadow 300ms ease-in-out;
        }
      }
    }
  `;
});
