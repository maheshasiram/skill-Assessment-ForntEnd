import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux/es/exports';
import store from './store';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/primeicons/primeicons.css';
import '../node_modules/primereact/resources/themes/lara-light-indigo/theme.css';
import '../node_modules/primereact/resources/primereact.css';
 import '../node_modules/primeflex/primeflex.css';
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
