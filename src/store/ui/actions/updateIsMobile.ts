import { resizeCallbak } from '../../../libs/utils';
import { get, set } from '../useUiStore';

export function updateIsMobile() {
  return resizeCallbak(() => {
    const { isMobile } = get();
    const _isMobile = window.innerWidth < 480;
    const needChange = isMobile !== _isMobile;
    needChange && set({ isMobile: _isMobile });
  }, 100);
}
