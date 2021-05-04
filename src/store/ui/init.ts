import { StoreInit } from '../types';
import { updateIsMobile } from './actions/updateIsMobile';

export const initUiStore: StoreInit = () => {
  const unsub = updateIsMobile();
  return unsub;
};
