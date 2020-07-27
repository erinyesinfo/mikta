import { getUser } from '../Actions/types.js';

const INIALSTATE = JSON.parse(localStorage.getItem("user")) || {};

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getUser:
            return action.payload;
        default:
            return state;
    }
};