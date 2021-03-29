import { ColorVariables } from './ColorVariables';
import { Fonts } from './Fonts';
import './global.scss';

export const GlobalStyles: React.FC = () => {
  return (
    <>
      <ColorVariables />
      <Fonts />
    </>
  );
};
