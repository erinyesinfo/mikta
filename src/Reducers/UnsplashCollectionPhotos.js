import { unsplash_getUserCollectionPhotos_type } from '../Actions/types.js';

const INIALSTATE = JSON.parse(localStorage.getItem("collection-photos")) || [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case unsplash_getUserCollectionPhotos_type:
            return action.payload;
        default:
            return state;
    }
};