import { unsplash_getUserLikes_type } from '../Actions/types.js';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case unsplash_getUserLikes_type:
            return action.payload;
        default:
            return state;
    }
};