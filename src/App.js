import React, { lazy, Suspense, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import GlobalStyles from './components/GlobalStyles';
import Loader from './components/Loader';
import InitialLoader from './components/InitialLoader';

const Nav = lazy(() => import('./components/Nav'));
const Landing = lazy(() => import('./pages/Landing'));
const Settings = lazy(() => import('./pages/Settings'));
const Upload = lazy(() => import('./pages/Upload'));
const Search = lazy(() => import('./pages/Search'));
const Video = lazy(() => import('./pages/Video'));

const App = () => {
  const { initialLoading } = useContext(UserContext);

  return (
    <>
      {
        initialLoading ? (
          <InitialLoader />
        ) : (
          <>
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
                <Route path='/search/:query' exact>
                  <Search />
                </Route>
                <Route path='/video/:id' exact>
                  <Video />
                </Route>
              </Switch>
            </Suspense>
          </>
        )
      }
    </>
  );
}

export default App;
