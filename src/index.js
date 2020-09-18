import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';
import * as theme from './config/theme';

const render = Component =>
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Component />
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
