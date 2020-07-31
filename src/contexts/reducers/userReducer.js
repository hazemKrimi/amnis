export const SIGN_UP = 'LOG_IN';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'UPDATE_USER';

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case SIGN_UP: return { ...state, user: payload };
        case LOG_IN: return { ...state, user: payload };
        case LOG_OUT: return { ...state, user: null };
        case UPDATE_USER: return { ...state, user: payload };
        case DELETE_USER: return { ...state, user: null };
        default: return state;
    }
}