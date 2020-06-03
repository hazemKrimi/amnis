export const SIGN_UP = 'LOG_IN';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const reducer = (state, { type }) => {
    switch (type) {
        case SIGN_UP: return { ...state, loggedIn: true };
        case LOG_IN: return { ...state, loggedIn: true };
        case LOG_OUT: return { ...state, loggedIn: false };
        default: return state;
    }
}