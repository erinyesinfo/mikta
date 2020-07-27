import { unsplash_getUser_type } from '../Actions/types.js';

const INIALSTATE = {};

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case unsplash_getUser_type:
            return action.payload;
        default:
            return state;
    }
};