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
const Stream = lazy(() => import('./pages/Stream'));
const Search = lazy(() => import('./pages/Search'));
const Video = lazy(() => import('./pages/Video'));
const Live = lazy(() => import('./pages/Live'));

const Offline = styled.div`
  background: #777777;
  height: auto;
  padding: 0.5rem 0rem;

  div {
    width: 90%;
    margin: auto;
    display: grid;
    grid-template-rows: auto;
    align-items: center;
  
    h3, h4 {
      font-family: 'Poppins';
      text-align: left;
    }
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
              <Nav />
              {
                offline && (
                  <Offline>
                    <div>
                      <h3>You are currently offline</h3>
                      <h4>Check your internet connection and try again</h4>
                    </div>
                  </Offline>
                )
              }
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
                <Route path='/stream' exact>
                  <Stream />
                </Route>
                <Route path='/search/:query' exact>
                  <Search />
                </Route>
                <Route path='/video/:id' exact>
                  <Video />
                </Route>
                <Route path='/live/:id' exact>
                  <Live />
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
