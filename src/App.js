import React, { lazy, Suspense, useContext } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import { MainContext } from './contexts/MainContext';
import GlobalStyles from './components/GlobalStyles';
import Loader from './components/Loader';
import InitialLoader from './components/InitialLoader';

const Nav = lazy(() => import('./components/Nav'));
const Landing = lazy(() => import('./pages/Landing'));
const Settings = lazy(() => import('./pages/Settings'));
const Upload = lazy(() => import('./pages/Upload'));
const Search = lazy(() => import('./pages/Search'));
const Video = lazy(() => import('./pages/Video'));

const Offline = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto;
  justify-content: center;
  align-items: center;

  h1, h3 {
    font-family: 'Poppins';
    text-align: center;
  }
`;

const App = () => {
  const { initialLoading } = useContext(UserContext);
  const { offline } = useContext(MainContext);

  return (
    <>
      {
        initialLoading ? (
          <InitialLoader />
        ) : (
          <>
            <GlobalStyles />
            <Suspense fallback={<Loader />}>
              {
                !offline ? (
                  <>
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
                  </>
                ) : (
                  <Offline>
                    <div>
                      <h1>You are currently offline</h1>
                      <h3>Check your internet connection and try again</h3>
                    </div>
                  </Offline>
                )
              }
            </Suspense>
          </>
        )
      }
    </>
  );
}

export default App;
