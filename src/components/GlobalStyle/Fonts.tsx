import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import { createGlobalStyle, css } from 'styled-components';

export const Fonts: React.FC = () => {
  return (
    <Fragment>
      {fontLinks}
      <ScFontVariables />
    </Fragment>
  );
};

const fontLinks = createPortal(
  <Fragment>
    <link rel='preconnect' href='https://fonts.gstatic.com' />
    <link href='https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap' rel='stylesheet' />
  </Fragment>,
  document.head
);

const ScFontVariables = createGlobalStyle(
  () => css`
    :root {
      --app-font: 'Inter', sans-serif;
      --code-font: 'Fira Mono', monospace;
      --app-font-size: 16px;
      --code-font-size: 16px;
    }
  `
);
