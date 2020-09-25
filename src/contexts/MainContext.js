import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { reducer, TOGGLE_DARK_MODE, SET_OFFLINE, SET_ONLINE, GET_VIDEOS, SEARCH } from './reducers/mainReducer';
import firebase from '../config/firebase';
import { UserContext } from './UserContext';

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
    const [{ darkMode, offline, showSignUp, showLogIn, videos, searchResults }, dispatch] = useReducer(reducer, {
        darkMode: false, 
        offline: false,
        videos: [],
        searchResults: []
    });
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) dispatch({ type: TOGGLE_DARK_MODE });
        
        window.addEventListener('offline', () => dispatch({ type: SET_OFFLINE }));
        window.addEventListener('online', () => dispatch({ type: SET_ONLINE }));
    }, []);
    
    const toggleDarkMode = () => dispatch({ type: TOGGLE_DARK_MODE });

    const getVideos = async() => {
        try {
            const videosSnapshot = await firebase.firestore().collection('videos').get();
            const videosPayload = [];
            videosSnapshot.forEach(video => videosPayload.push({ ...video.data(), id: video.id }));
            dispatch({ type: GET_VIDEOS, payload: videosPayload });
        } catch(err) {
            throw err;
        }
    };

    const getVideo = async id => {
        try {
            const video = await firebase.firestore().collection('videos').doc(id).get();
            return { ...video.data(), id: video.id };
        } catch (err) {
            throw err;
        }
    };

    const incrementVideoViews = async video => {
        try {
            await firebase.firestore().collection('videos').doc(video.id).update({
                views: video.views + 1
            });
        } catch(err) {
            throw err;
        }
    }

    const deleteVideo = async id => {
        try {
            await firebase.storage().ref(`thumbnails/${id}.png`).delete();
            await firebase.storage().ref(`videos/${id}.mp4`).delete();
            await firebase.firestore().collection('videos').doc(id).delete();
        } catch(err) {
            throw err;
        }
    };

    const search = async query => {
        try {
            const videosSnapshot = await firebase.firestore().collection('videos').where('title', '==', query).get();
            const videosPayload = [];
            videosSnapshot.forEach(video => videosPayload.push({ ...video.data(), id: video.id }));
            dispatch({ type: SEARCH, payload: videosPayload });
        } catch(err) {
            throw err;
        }
    }

    const addVideo = async(title, description, video, thumbnail) => {
        try {
            const videoRef = await firebase.firestore().collection('videos').add({ 
                title, 
                description,
                live: false,
                user,
                userEmail: user.email,
                views: 0
            });
            const videoSnapshot = await firebase.storage().ref(`videos/${videoRef.id}.mp4`).put(video);
            const videoUrl = await videoSnapshot.ref.getDownloadURL();
            const thumbnailSnapshot = await firebase.storage().ref(`thumbnails/${videoRef.id}.png`).put(thumbnail);
            const thumbnailoUrl = await thumbnailSnapshot.ref.getDownloadURL();
            await videoRef.update({ source: videoUrl, thumbnail: thumbnailoUrl });
        } catch(err) {
            throw err;
        }
    };
    
    return (
        <MainContext.Provider 
            value={{ 
                darkMode, 
                offline, 
                showSignUp, 
                showLogIn, 
                toggleDarkMode, 
                videos, 
                searchResults, 
                getVideos, 
                getVideo, 
                search, 
                addVideo,
                incrementVideoViews,
                deleteVideo
            }}
        >
            { children }
        </MainContext.Provider>
    )
};

export default MainContextProvider;