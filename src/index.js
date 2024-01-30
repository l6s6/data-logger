import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import CsvPlotter from './Chart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CsvPlotter />
  </React.StrictMode>
);
