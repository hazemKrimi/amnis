import React, { createContext, useReducer, useEffect } from 'react';
import { reducer, SIGN_UP, LOG_IN, LOG_OUT } from './reducers/authReducer';
import firebase from '../config/firebase';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [{ user }, dispatch] = useReducer(reducer, {
        user: null
    });

    useEffect(() => firebase.auth().onAuthStateChanged(user => {
        if (user) dispatch({ type: LOG_IN, payload: user });
        else dispatch({ type: LOG_OUT });
    }), []);

    const signUp = async(username, email, password) => {
        try {
            const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
            dispatch({ type: SIGN_UP, payload: user });
        } catch(err) {
            throw err;
        }
    }

    const logIn = async(email, password) => {
        try {
            const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
            dispatch({ type: LOG_IN, payload: user });
        } catch(err) {
            throw err;
        }
    }
    const logout = async() => {
        try {
            await firebase.auth().signOut();
            dispatch({ type: LOG_OUT });
        } catch(err) {
            throw err;
        }
    }

    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;