import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div
      style={{
        maxWidth: '1000px',
        width: '95%',
        margin: '50px auto',
      }}
    >
      <App prop={{ name: 'Root', data: 'Data' }} />
    </div>
  </React.StrictMode>
);
