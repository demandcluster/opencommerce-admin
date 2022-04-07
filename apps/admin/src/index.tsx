import {StrictMode} from "react";
import ReactDOM from 'react-dom'
import './styles/base.css';
import "./util/prepareRoutes";
import App from "./App";

ReactDOM.render(
  <StrictMode>
    <App/>
  </StrictMode>,
  document.getElementById('root')
);
