import styled from 'styled-components';
import * as CSS from 'csstype';
import { colors, textStyles } from './styles';
import { ColorGrid } from './ColorGrid';
import { TextStyleGrid } from './TextStyleGrid';
import { isin } from './utils';

interface Props {
  allStyles: CSS.Properties<string>;
  onChange: (style: CSS.Properties<string>) => void;
}

export const StyleEditor: React.FC<Props> = ({ allStyles, onChange }) => {
  const textStyleChangeHandler = (style: CSS.Properties<string>) => {
    if (isin(style, allStyles)) {
      const newStyles = { ...allStyles };
      Object.keys(style).forEach(k => k in newStyles && delete newStyles[k]);
      onChange(newStyles);
    } else onChange({ ...allStyles, ...style });
  };

  const colorChangeHandler = (key: keyof CSS.Properties<string>) => (
    value: string
  ) => onChange({ ...allStyles, [key]: value });

  return (
    <ScContainer>
      <TextStyleGrid
        textStyleItems={textStyles}
        allStyles={allStyles}
        onChange={textStyleChangeHandler}
      />
      <ColorGrid
        colors={colors}
        name='Line color'
        activeColor={allStyles.textDecorationColor}
        onChange={colorChangeHandler('textDecorationColor')}
      />
      <ColorGrid
        colors={colors}
        name='Text color'
        activeColor={allStyles.color}
        onChange={colorChangeHandler('color')}
      />
      <ColorGrid
        colors={colors}
        name='Background color'
        activeColor={allStyles.backgroundColor}
        onChange={colorChangeHandler('backgroundColor')}
      />
    </ScContainer>
  );
};

const ScContainer = styled.div`
  font-size: 14px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  padding: 8px;
`;
