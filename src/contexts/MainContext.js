import React, { createContext, useState, useEffect } from 'react';

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [offline, setOffline] = useState(false);
    const toggleDarkMode = () => setDarkMode(!darkMode);

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setDarkMode(true);

        window.addEventListener('offline', () => setOffline(true));
        window.addEventListener('online', () => setOffline(false));
    }, []);

    return (
        <MainContext.Provider value={{ darkMode, offline, toggleDarkMode }}>
            { children }
        </MainContext.Provider>
    )
};

export default MainContextProvider;