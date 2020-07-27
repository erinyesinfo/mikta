import { getStatus } from '../Actions/types.js';

const INIALSTATE = JSON.parse(localStorage.getItem("isLogIn")) || false;

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getStatus:
            return action.payload;
        default:
            return state;
    }
};