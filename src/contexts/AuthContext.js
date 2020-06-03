import React, { createContext, useReducer } from 'react';
import { reducer, SIGN_UP, LOG_IN, LOG_OUT } from './reducers/authReducer';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [{ loggedIn }, dispatch] = useReducer(reducer, {
        loggedIn: false
    });

    const signUp = () => dispatch({ type: SIGN_UP });
    const logIn = () => dispatch({ type: LOG_IN });
    const logout = () => dispatch({ type: LOG_OUT });

    return (
        <AuthContext.Provider value={{ loggedIn, signUp, logIn, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;