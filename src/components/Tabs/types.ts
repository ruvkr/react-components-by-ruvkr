interface IconProps {
  active: boolean;
  onClick: () => void;
}

export type TabItem = {
  id: string;
  name: string;
  icon: (props: IconProps) => React.ReactElement | null;
  content?: JSX.Element;
  isButton?: boolean;
  onClick?: () => void;
};
