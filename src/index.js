import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MainContextProvider from './contexts/MainContext';
import UserContextProvider from './contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <MainContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MainContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
