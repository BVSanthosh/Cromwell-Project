import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto';
import './index.css';
import App from './App';
import AppTheme from './theme/AppTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppTheme>
      <App />
    </AppTheme>
  </React.StrictMode>
);