import React, { createContext, useReducer, useEffect } from 'react';
import { reducer, TOGGLE_DARK_MODE, SET_OFFLINE, SET_ONLINE } from './reducers/mainReducer';

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
    const [{ darkMode, offline, showSignUp, showLogIn }, dispatch] = useReducer(reducer, {
        darkMode: false, 
        offline: false
    });

    const toggleDarkMode = () => dispatch({ type: TOGGLE_DARK_MODE });

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) dispatch({ type: TOGGLE_DARK_MODE });

        window.addEventListener('offline', () => dispatch({ type: SET_OFFLINE }));
        window.addEventListener('online', () => dispatch({ type: SET_ONLINE }));
    }, []);

    return (
        <MainContext.Provider value={{ darkMode, offline, showSignUp, showLogIn, toggleDarkMode }}>
            { children }
        </MainContext.Provider>
    )
};

export default MainContextProvider;