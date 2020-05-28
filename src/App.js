import React, { lazy, Suspense } from 'react';
import MainContextProvider from './contexts/MainContext';
import { Switch, Route } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import Loader from './components/Loader';

const Landing = lazy(() => import('./pages/Landing'));

const App = () => {
  return (
    <MainContextProvider>
      <GlobalStyles />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route>
            <Landing />
          </Route>
        </Switch>
      </Suspense>
    </MainContextProvider>
  );
}

export default App;
