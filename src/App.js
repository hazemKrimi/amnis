import React, { lazy, Suspense } from 'react';
import MainContextProvider from './contexts/MainContext';
import UserContextProvider from './contexts/UserContext';
import { Switch, Route } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import Loader from './components/Loader';

const Nav = lazy(() => import('./components/Nav'));
const Landing = lazy(() => import('./pages/Landing'));
const Settings = lazy(() => import('./pages/Settings'));
const Upload = lazy(() => import('./pages/Upload'));

const App = () => {
  return (
    <MainContextProvider>
      <UserContextProvider>
        <GlobalStyles />
        <Suspense fallback={<Loader />}>
          <Nav />
          <Switch>
            <Route path='/' exact>
              <Landing />
            </Route>
            <Route path='/settings' exact>
              <Settings />
            </Route>
            <Route path='/upload' exact>
              <Upload />
            </Route>
          </Switch>
        </Suspense>
      </UserContextProvider>
    </MainContextProvider>
  );
}

export default App;
