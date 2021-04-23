import { Fragment } from 'react';
import shallow from 'zustand/shallow';
import { createPortal } from 'react-dom';
import { createGlobalStyle, css } from 'styled-components';
import { useConfigsStore, ConfigsStore, Font } from '../../store/configs';
import { createFontApi } from './utils';

const getState = (state: ConfigsStore) => ({
  appFont: state.appFont,
  codeFont: state.codeFont,
});

export const Fonts: React.FC = () => {
  const state = useConfigsStore(getState, shallow);
  const api = createFontApi([state.appFont, state.codeFont]);

  return (
    <Fragment>
      <FontLinks api={api} />
      <ScFontVariables {...state} />
    </Fragment>
  );
};

const FontLinks: React.FC<{ api: string }> = ({ api }) => {
  return createPortal(
    <Fragment>
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link href={`https://fonts.googleapis.com/css2?${api}&display=swap`} rel='stylesheet' />
    </Fragment>,
    document.head
  );
};

interface FontVariablesProps {
  appFont: Font;
  codeFont: Font;
}

const ScFontVariables = createGlobalStyle<FontVariablesProps>(
  p => css`
    :root {
      --app-font: ${p.appFont.name}, sans-serif;
      --code-font: ${p.codeFont.name}, monospace;
      --app-font-size: 16px;
      --code-font-size: 16px;
    }
  `
);
