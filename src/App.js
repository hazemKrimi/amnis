import React, { lazy, Suspense } from 'react';
import MainContextProvider from './contexts/MainContext';
import { Switch, Route } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import Loader from './components/Loader';

const Nav = lazy(() => import('./components/Nav'));
const Landing = lazy(() => import('./pages/Landing'));

const App = () => {
  return (
    <MainContextProvider>
      <GlobalStyles />
      <Suspense fallback={<Loader />}>
        <Nav />
        <Switch>
          <Route path='/' exact>
            <Landing />
          </Route>
        </Switch>
      </Suspense>
    </MainContextProvider>
  );
}

export default App;
