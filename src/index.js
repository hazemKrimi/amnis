import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MainContextProvider from './contexts/MainContext';
import UserContextProvider from './contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <MainContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </MainContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
