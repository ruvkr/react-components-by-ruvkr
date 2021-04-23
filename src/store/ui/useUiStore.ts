import create from 'zustand';
import { devtools } from 'zustand/middleware';

export type UiStore = {};

const uiStoreCreator = (): UiStore => ({});

export const useUiStore = create<UiStore>(
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? devtools(uiStoreCreator, 'ui-store')
    : uiStoreCreator
);

export const { getState: get, setState: set } = useUiStore;
