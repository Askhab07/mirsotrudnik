import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import AppProvider from './context/AppProviders';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <React.StrictMode>
      <AppProvider>
      <App />
      </AppProvider>
    </React.StrictMode>
  </HashRouter>
);
