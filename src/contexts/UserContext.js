import React, { createContext, useReducer, useEffect } from 'react';
import { reducer, SIGN_UP, LOG_IN, LOG_OUT } from './reducers/userReducer';
import firebase from '../config/firebase';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [{ user }, dispatch] = useReducer(reducer, {
        user: null
    });

    useEffect(() => firebase.auth().onAuthStateChanged(user => {
        if (user) dispatch({
            type: LOG_IN,
            payload: {
                displayName: user.providerData[0].displayName,
                email: user.providerData[0].email,
                photoURL: user.providerData[0].photoURL,
                uid: user.providerData[0].uid
            }
        });
        else dispatch({ type: LOG_OUT });
    }), []);

    const signUp = async(username, email, password) => {
        try {
            const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
            user.updateProfile({ displayName: username });
            dispatch({ 
                type: SIGN_UP,
                payload: { 
                    displayName: user.providerData[0].displayName,
                    email: user.providerData[0].email,
                    photoURL: user.providerData[0].photoURL,
                    uid: user.providerData[0].uid 
                }
            });
        } catch(err) {
            throw err;
        }
    }

    const logIn = async(email, password) => {
        try {
            const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
            dispatch({
                type: LOG_IN,
                payload: {
                    displayName: user.providerData[0].displayName,
                    email: user.providerData[0].email,
                    photoURL: user.providerData[0].photoURL,
                    uid: user.providerData[0].uid
                }
            });
        } catch(err) {
            throw err;
        }
    }
    const logOut = async() => {
        try {
            await firebase.auth().signOut();
            dispatch({ type: LOG_OUT });
        } catch(err) {
            throw err;
        }
    }

    return (
        <UserContext.Provider value={{ user, signUp, logIn, logOut }}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContextProvider;