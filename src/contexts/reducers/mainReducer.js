export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const SET_ONLINE = 'SET_ONLINE';
export const SET_OFFLINE = 'SET_OFFLINE';
export const OPEN_SIGN_UP = 'OPEN_SIGN_UP';
export const CLOSE_SIGN_UP = 'CLOSE_SIGN_UP';
export const OPEN_LOG_IN = 'OPEN_LOG_IN';
export const CLOSE_LOG_IN = 'CLOSE_LOG_IN';

export const reducer = (state, { type }) => {
    switch(type) {
        case TOGGLE_DARK_MODE: return { ...state, darkMode: !state.darkMode };
        case SET_OFFLINE: return { ...state, offline: true };
        case SET_ONLINE: return { ...state, offline: false };
        case OPEN_SIGN_UP: return { ...state, showSignUp: true };
        case CLOSE_SIGN_UP: return { ...state, showSignUp: false };
        case OPEN_LOG_IN: return { ...state, showLogIn: true };
        case CLOSE_LOG_IN: return { ...state, showLogIn: false };
        default: return state;
    }
}