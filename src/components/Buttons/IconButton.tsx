import styled, { css } from 'styled-components';

interface Props {
  disabled?: boolean;
  active?: boolean;
  icon: JSX.Element;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const IconButton: React.FC<Props> = ({
  disabled = false,
  active = false,
  icon,
  className,
  onClick,
}) => {
  return (
    <ScButton disabled={disabled} className={className} onClick={onClick}>
      <ScFocus $active={active} tabIndex={-1}>
        <ScIcon $active={active}>{icon}</ScIcon>
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

const ScFocus = styled.div<{ $active: boolean }>(
  ({ $active, theme }) => css`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    background-color: ${$active ? theme.col2 : theme.col4};
    transition: all 300ms ease-in-out;

    &:focus,
    &:active {
      outline: none;
    }
  `
);

const ScIcon = styled.div<{ $active: boolean }>(
  ({ $active, theme }) => css`
    display: flex;
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    padding: 8px;
    color: ${$active ? theme.col4 : theme.col2};
    fill: ${$active ? theme.col4 : theme.col2};
    stroke: ${$active ? theme.col4 : theme.col2};
    transition: all 300ms ease-in-out;
  `
);
