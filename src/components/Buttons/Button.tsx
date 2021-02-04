import { rgba } from 'polished';
import styled from 'styled-components';

interface Props {
  disabled?: boolean;
  icon?: JSX.Element;
  name?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<Props> = ({
  disabled = false,
  icon,
  name,
  className,
  onClick,
}) => {
  return (
    <ScButton disabled={disabled} onClick={onClick}>
      <ScFocus tabIndex={-1} className={className}>
        {icon && <ScIcon>{icon}</ScIcon>}
        {name && <ScLabel $hasIcon={Boolean(icon)}>{name}</ScLabel>}
      </ScFocus>
    </ScButton>
  );
};

const ScButton = styled.button`
  font: inherit;
  padding: 0;
  margin: 0;
  border: none;
  display: flex;
  background-color: transparent;
  cursor: pointer;
  transition: opacity 300ms ease-in-out;

  &:focus,
  &:active {
    outline: none;
    & > div {
      box-shadow: 0 0 0 2px ${p => p.theme.col3};
      transition: box-shadow 300ms ease-in-out;
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
        box-shadow: 0 0 0 2px ${p => p.theme.col3};
        transition: box-shadow 300ms ease-in-out;
      }
    }
  }
`;

const ScFocus = styled.div`
  width: 100%;
  height: 100%;
  min-height: 36px;
  display: flex;
  align-items: center;
  border-radius: 999px;
  background-color: ${p => p.theme.col4};
  overflow: hidden;
  transition: box-shadow 300ms ease-in-out;

  &:focus,
  &:active {
    outline: none;
  }
`;

const ScIcon = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  padding: 8px;
  color: ${p => p.theme.col2};
  fill: ${p => p.theme.col2};
  stroke: ${p => p.theme.col2};
  background-color: rgba(0, 0, 0, 0.15);
`;

const ScLabel = styled.div<{ $hasIcon: boolean }>`
  color: ${p => rgba(p.theme.col1, 0.5)};
  padding: 8px 16px;
  padding-left: ${p => (p.$hasIcon ? 8 : 16)}px;
`;
