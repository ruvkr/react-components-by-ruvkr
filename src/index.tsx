import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { modifyHistoryApi } from './libs/utils';

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));

// modify history api to add custom events
modifyHistoryApi();
