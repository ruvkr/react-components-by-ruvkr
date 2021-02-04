import styled from 'styled-components';
import { rgba } from 'polished';
import { Close } from '../../assets/icons/essentials';

interface Props {
  name: string;
  colors: string[];
  activeColor?: string;
  onChange?: (color: string) => void;
}

export const ColorGrid: React.FC<Props> = ({
  name,
  colors,
  activeColor,
  onChange,
}) => {
  const _colors = colors.map(color => (
    <ScColorItem key={color} onClick={() => onChange && onChange(color)}>
      <ScFocus $color={color} $active={color === activeColor} tabIndex={-1} />
    </ScColorItem>
  ));

  return (
    <ScContainer>
      <ScLabel children={name} />
      <ScColorGrid>
        <ScColorItem
          key='inherit'
          onClick={() => onChange && onChange('inherit')}
          children={
            <ScNoneFocus
              $active={activeColor === 'inherit'}
              tabIndex={-1}
              children={<ScNoneIcon />}
            />
          }
        />
        {_colors}
      </ScColorGrid>
    </ScContainer>
  );
};

const ScContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: min-content;
  grid-gap: 8px;
`;

const ScLabel = styled.label`
  width: 100%;
  padding: 0;
  margin: 0;
  color: ${p => rgba(p.theme.col1, 0.5)};
`;

const ScColorGrid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const ScColorItem = styled.button`
  font: inherit;
  padding: 0;
  margin: 2px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:focus,
  &:active {
    outline: none;
    & > div {
      transform: scale(1.1);
      transition: transform 300ms ease-in-out;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      & > div {
        transform: scale(1.1);
        transition: transform 300ms ease-in-out;
      }
    }
  }
`;

const ScFocus = styled.div<{ $color: string; $active: boolean }>`
  width: 28px;
  height: 28px;
  background-color: ${p => p.$color};
  border-radius: ${p => (p.$active ? 50 : 0)}%;
  transition: transform 300ms ease-in-out;

  &:focus,
  &:active {
    outline: none;
  }
`;

const ScNoneFocus = styled.div<{ $active: boolean }>`
  width: 28px;
  height: 28px;
  padding: 6px;
  background-color: ${p => p.theme.col4};
  border-radius: ${p => (p.$active ? 50 : 0)}%;
  transition: transform 300ms ease-in-out;

  &:focus,
  &:active {
    outline: none;
  }
`;

const ScNoneIcon = styled(Close)`
  width: 100%;
  height: 100%;
  display: flex;
  color: ${p => p.theme.col2};
  fill: ${p => p.theme.col2};
  stroke: ${p => p.theme.col2};
`;
