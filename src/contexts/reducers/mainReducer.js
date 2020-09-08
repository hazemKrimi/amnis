export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const SET_ONLINE = 'SET_ONLINE';
export const SET_OFFLINE = 'SET_OFFLINE';
export const GET_VIDEOS = 'GET_VIDEOS';
export const SEARCH = 'SEARCH';

export const reducer = (state, { type, payload }) => {
    switch(type) {
        case TOGGLE_DARK_MODE: return { ...state, darkMode: !state.darkMode };
        case SET_OFFLINE: return { ...state, offline: true };
        case SET_ONLINE: return { ...state, offline: false };
        case GET_VIDEOS: return { ...state, videos: payload };
        case SEARCH: return { ...state, searchResults: payload };
        default: return state;
    }
}