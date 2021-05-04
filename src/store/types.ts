export type StoreInit = () =>
  | Promise<(() => void) | undefined>
  | (() => void)
  | void;
