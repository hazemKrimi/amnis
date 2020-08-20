import React, { createContext, useReducer, useEffect, useState } from 'react';
import { reducer, SIGN_UP, LOG_IN, LOG_OUT, UPDATE_USER, DELETE_USER } from './reducers/userReducer';
import firebase from '../config/firebase';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [{ user }, dispatch] = useReducer(reducer, {
        user: null
    });
    const [ initialLoading, setInitialLoading ] = useState(false);

    useEffect(() => {
        setInitialLoading(true);
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch({
                    type: LOG_IN,
                    payload: {
                        displayName: user.providerData[0].displayName,
                        email: user.providerData[0].email,
                        photoURL: user.providerData[0].photoURL,
                        uid: user.providerData[0].uid
                    }
                });
                setInitialLoading(false);
            }
            else {
                dispatch({ type: LOG_OUT });
                setInitialLoading(false);
            }
        })
    }, []);

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

    const updateAccount = async(username, email, avatar, password) => {
        try {
            if (username) await firebase.auth().currentUser.updateProfile({ displayName: username });
            if (email) await firebase.auth().currentUser.updateEmail(email);
            if (avatar) {
                const snapshot = await firebase.storage().ref(`avatars/${firebase.auth().currentUser.uid}.png`).put(avatar);
                const url = await snapshot.ref.getDownloadURL();
                await firebase.auth().currentUser.updateProfile({ photoURL: url });
                avatar = url;
            }
            if (password) await firebase.auth().currentUser.updatePassword(password);
            dispatch({
                type: UPDATE_USER,
                payload: {
                    displayName: username ? username : firebase.auth().currentUser.displayName,
                    email: email ? email : firebase.auth().currentUser.email,
                    photoURL: avatar ? avatar : firebase.auth().currentUser.photoURL,
                    uid: firebase.auth().currentUser.uid
                }
            });
        } catch(err) {
            throw err;
        }
    }

    const deleteAccount = async() => {
        try {
            await firebase.storage().ref(`avatars/${firebase.auth().currentUser.uid}.png`).delete();
            await firebase.auth().currentUser.delete();
            dispatch({ type: DELETE_USER });
        } catch(err) {
            throw err;
        }
    }

    const reAuth = async(email, password) => {
        try {
            await firebase.auth().currentUser.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(email, password));
        } catch (err) {
            throw err;
        }
    }

    return (
        <UserContext.Provider value={{ initialLoading, user, signUp, logIn, logOut, reAuth, updateAccount, deleteAccount }}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContextProvider;