import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import CsvPlotter from './Chart';
import Navbar from './Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <CsvPlotter />
    <div className='flex justify-center mt-16'>
      <iframe
        width='800'
        height='500'
        src='/demo.html'
        title='Map with GPX track'
      ></iframe>
    </div>
  </React.StrictMode>
);
