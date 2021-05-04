import styles from './styles.module.scss';
import { Position } from '../../../components/SlideDrawer';
import { ChevronBack, ChevronForward, ChevronUp, ChevronDown, ColorPalette } from '../../../assets/icons/essentials';
import { SettingItem } from './SettingItem';
import { themes } from '../../../assets/themes';
import { useUiStore, UiStore, set as setUi } from '../../../store/ui';
import { ConfigsStore, useConfigsStore, set as setConfig } from '../../../store/configs';
import shallow from 'zustand/shallow';

const getTheme = (state: ConfigsStore) => state.theme;
const getUiState = (state: UiStore) => ({
  position: state.sdPosition,
  isMobile: state.isMobile,
});

const sides: { position: Position; name: string; icon: JSX.Element }[] = [
  { position: 'left', name: 'Left', icon: <ChevronBack /> },
  { position: 'right', name: 'Right', icon: <ChevronForward /> },
  { position: 'top', name: 'Top', icon: <ChevronUp /> },
  { position: 'bottom', name: 'Bottom', icon: <ChevronDown /> },
];

export const Settings: React.FC = () => {
  const theme = useConfigsStore(getTheme);
  const { position } = useUiStore(getUiState, shallow);

  const _themes = themes.map(t => (
    <SettingItem
      key={t.name}
      name={t.name}
      active={theme.name === t.name}
      icon={<ColorPalette />}
      onClick={() => setConfig({ theme: t })}
    />
  ));

  const _sides = sides.map(s => (
    <SettingItem
      key={s.position}
      name={s.name}
      active={position === s.position}
      icon={s.icon}
      onClick={() => setUi({ sdPosition: s.position })}
    />
  ));

  return (
    <div className={styles.container}>
      <label className={styles.label}>Settings</label>
      <div className={styles.body}>
        <label className={styles.name}>Enable Dark Theme</label>
        <label className={styles.name}>Drawer position</label>
        <div className={styles.base}>{_sides}</div>
      </div>
    </div>
  );
};
