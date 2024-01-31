import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import CsvPlotter from './Chart';
import Navbar from './Navbar';
import Map from './Map';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <CsvPlotter />
    <Map />
  </React.StrictMode>
);
