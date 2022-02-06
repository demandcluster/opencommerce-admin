import React from 'react';
import ReactDOM from 'react-dom';

import './styles/base.css';
import {App} from 'platform';
import "./util/prepareRoutes";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
