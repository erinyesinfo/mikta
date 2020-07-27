import { getStatusUnsplashTerm } from '../Actions/types.js';

const INIALSTATE = JSON.parse(localStorage.getItem("isUnsplashTerm")) || false;

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getStatusUnsplashTerm:
            return action.payload;
        default:
            return state;
    }
};