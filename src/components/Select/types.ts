export type OptionItem =
  | {
      id: string;
      disabled?: boolean;
      icon?: JSX.Element;
      name: string;
      title?: string;
      onClick?: () => void;
    }
  | '---'; // devider

export interface ControlItem {
  id: string;
  title: string;
  icon: JSX.Element;
  disabled?: boolean;
  onClick?: () => void;
}