import { unsplash_getPostSearchPhotos_type } from '../Actions/types';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case unsplash_getPostSearchPhotos_type:
            return action.payload;
        default:
            return state;
    }
};