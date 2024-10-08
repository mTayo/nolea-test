import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import Providers from "./providers";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Providers>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Providers>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
