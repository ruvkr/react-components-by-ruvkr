export interface Subscriber {
  id: number;
  callback: Function;
  config?: any;
}
