export interface NavitemI {
  id: string;
  disabled?: boolean;
  externalLink?: boolean;
  icon: JSX.Element;
  name: string;
  onClick?: () => void;
}

export interface NavitemsGroupI {
  id: string;
  name: string;
  collapsable?: boolean;
  collapsed?: boolean;
  items: NavitemI[];
}
