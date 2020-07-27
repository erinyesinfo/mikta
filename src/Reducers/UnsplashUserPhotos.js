import { unsplash_getUserPhotos_type } from '../Actions/types.js';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case unsplash_getUserPhotos_type:
            return action.payload;
        default:
            return state;
    }
};