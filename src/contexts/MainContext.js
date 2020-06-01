import React, { createContext, useReducer, useEffect } from 'react';
import { reducer, TOGGLE_DARK_MODE, SET_OFFLINE, SET_ONLINE, OPEN_SIGN_UP, CLOSE_SIGN_UP, OPEN_LOG_IN, CLOSE_LOG_IN } from './reducers/mainReducer';

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
    const [{ darkMode, offline, showSignUp, showLogIn }, dispatch] = useReducer(reducer, {
        darkMode: false, 
        offline: false, 
        showSignUp: false, 
        showLogIn: false
    });

    const toggleDarkMode = () => dispatch({ type: TOGGLE_DARK_MODE });
    const openSignUp = () => dispatch({ type: OPEN_SIGN_UP });
    const closeSignUp = () => dispatch({ type: CLOSE_SIGN_UP });
    const openLogIn = () => dispatch({ type: OPEN_LOG_IN });
    const closeLogIn = () => dispatch({ type: CLOSE_LOG_IN });

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) dispatch({ type: TOGGLE_DARK_MODE });

        window.addEventListener('offline', () => dispatch({ type: SET_OFFLINE }));
        window.addEventListener('online', () => dispatch({ type: SET_ONLINE }));
    }, []);

    return (
        <MainContext.Provider value={{ darkMode, offline, showSignUp, showLogIn, toggleDarkMode, openSignUp, closeSignUp, openLogIn, closeLogIn }}>
            { children }
        </MainContext.Provider>
    )
};

export default MainContextProvider;