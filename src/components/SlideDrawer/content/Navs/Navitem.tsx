import styled from 'styled-components';
import { rgba } from 'polished';

interface Props {
  disabled?: boolean;
  externalLink?: boolean;
  icon: JSX.Element;
  name: string;
  onClick?: () => void;
  focusable: boolean;
}

export const Navitem: React.FC<Props> = ({
  icon,
  name,
  onClick,
  disabled,
  focusable = true,
}) => {
  return (
    <ScNavitem
      disabled={disabled}
      onClick={onClick}
      tabIndex={focusable ? 0 : -1}
    >
      <ScFocus tabIndex={-1}>
        <ScIcon>{icon}</ScIcon>
        <ScName>{name}</ScName>
      </ScFocus>
    </ScNavitem>
  );
};

const ScNavitem = styled.button`
  width: 100%;
  font: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${p => p.theme.col1};
  padding: 0;
  display: flex;
  align-items: center;
  transition: background-color 300ms ease-in-out;

  &:focus,
  &:active {
    outline: none;
    & > div {
      background-color: ${p => rgba(p.theme.col2, 0.2)};
      transition: background-color 300ms ease-in-out;
    }
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.2;
    transition: opacity 300ms ease-in-out;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      & > div {
        background-color: ${p => rgba(p.theme.col2, 0.2)};
        transition: background-color 300ms ease-in-out;
      }
    }
  }
`;

const ScFocus = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px 22px;
  display: flex;
  align-items: center;
  background-color: transparent;
  transition: background-color 300ms ease-in-out;

  &:focus,
  &:active {
    outline: none;
  }
`;

const ScIcon = styled.div`
  width: 20px;
  height: 20px;
  fill: ${p => p.theme.col2};
  stroke: ${p => p.theme.col2};
  margin-right: 12px;
`;

const ScName = styled.div``;
