import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Position } from '../../components/SlideDrawer';

export type UiStore = {
  sdPosition: Position;
  isMobile: boolean;
};

const uiStoreCreator = (): UiStore => ({
  sdPosition: 'left',
  isMobile: window.innerWidth < 480,
});

export const useUiStore = create<UiStore>(
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? devtools(uiStoreCreator, 'ui-store')
    : uiStoreCreator
);

export const { getState: get, setState: set } = useUiStore;
