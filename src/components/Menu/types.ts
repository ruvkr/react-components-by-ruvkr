export interface MenuItem {
  id: string;
  disabled?: boolean;
  icon?: JSX.Element;
  isSubMenu?: boolean;
  items?: MenuItem[];
  name: string;
  onClick?: () => void;
}

export interface ControlItem {
  id: string;
  icon: JSX.Element;
  disabled?: boolean;
  onClick?: () => void;
}
