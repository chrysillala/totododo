import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    box-sizing: border-box;
    --primary: #FFD717;
    --secondary: #0D63A5;
    --form-background: #083358;
    --app-background: #393E6F;
    --white: #ffffff;
    --black: #001f3f;
    --light-gray: #808080;
    --gray: #6b6b6b;
    --red: #ff1717;
  }

  body {
    background-color: var(--app-background);
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
