import styled from 'styled-components';
import { rgba } from 'polished';
import * as CSS from 'csstype';
import { TextStyle } from './types';
import { isin } from './utils';

interface Props {
  textStyleItems: TextStyle[];
  onChange?: (style: CSS.Properties<string>) => void;
  allStyles: CSS.Properties<string>;
}

export const TextStyleGrid: React.FC<Props> = ({
  allStyles,
  textStyleItems,
  onChange,
}) => {
  const _styles = textStyleItems.map(item => (
    <ScTextStyle key={item.id} onClick={() => onChange && onChange(item.style)}>
      <ScFocus
        $active={isin(item.style, allStyles)}
        style={item.itemStyle}
        tabIndex={-1}
        children={item.name}
      />
    </ScTextStyle>
  ));

  return (
    <ScContainer>
      <ScLabel children='Text Styles' />
      <ScTextStylesGrid children={_styles} />
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

const ScTextStylesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ScTextStyle = styled.button`
  font: inherit;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:focus,
  &:active {
    outline: none;
    & > div {
      color: ${p => p.theme.col2};
      transition: color 300ms ease-in-out;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      & > div {
        color: ${p => p.theme.col2};
        transition: color 300ms ease-in-out;
      }
    }
  }
`;

const ScFocus = styled.div<{ $active: boolean }>`
  font-size: 18px;
  padding: 8px;
  color: ${p => (p.$active ? p.theme.col2 : p.theme.col3)};
  transition: color 300ms ease-in-out;

  &:focus,
  &:active {
    outline: none;
  }
`;
