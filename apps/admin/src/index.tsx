import React from 'react';
import ReactDOM from 'react-dom';

import './styles/base.css';
import {App} from 'platform';
import {registerRoutes, registerOperatorRoutes} from 'platform/router';
import {globalRoutes} from 'platform';
import {operatorRoutes} from 'core-ui';

registerRoutes(globalRoutes);
registerOperatorRoutes(operatorRoutes);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
