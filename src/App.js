import React, { lazy, Suspense } from 'react';
import MainContextProvider from './contexts/MainContext';
import AuthContextProvider from './contexts/AuthContext';
import { Switch, Route } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import Loader from './components/Loader';

const Nav = lazy(() => import('./components/Nav'));
const Landing = lazy(() => import('./pages/Landing'));
const Settings = lazy(() => import('./pages/Settings'));

const App = () => {
  return (
    <MainContextProvider>
      <AuthContextProvider>
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
          </Switch>
        </Suspense>
      </AuthContextProvider>
    </MainContextProvider>
  );
}

export default App;
