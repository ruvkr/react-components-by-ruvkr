import { modifyHistoryApi } from '../libs/utils';
import { initUiStore } from './ui/init';

export const initializeStore = () => {
  modifyHistoryApi();
  const unsubUi = initUiStore();

  return () => {
    if (typeof unsubUi === 'function') unsubUi();
  };
};
