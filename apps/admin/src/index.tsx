import {StrictMode} from "react";
import ReactDOM from 'react-dom'
import './styles/base.css';
import {App} from 'platform';
import "./util/prepareRoutes";

ReactDOM.render(
  <StrictMode>
    <App/>
  </StrictMode>,
  document.getElementById('root')
);
