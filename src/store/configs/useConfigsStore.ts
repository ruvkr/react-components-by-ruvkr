import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Font, Theme } from './types';
import { themes } from '../../assets/themes';

export type ConfigsStore = {
  theme: Theme;
  appFont: Font;
  codeFont: Font;
};

const configsStoreCreator = (): ConfigsStore => ({
  theme: themes[0],
  appFont: { name: 'Fira Sans', category: 'sans-serif', weights: [400, 500, 700] },
  codeFont: { name: 'Fira Mono', category: 'monospace', weights: [400, 500, 700] },
});

export const useConfigsStore = create<ConfigsStore>(
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? devtools(configsStoreCreator, 'configs-store')
    : configsStoreCreator
);

export const { getState: get, setState: set } = useConfigsStore;
