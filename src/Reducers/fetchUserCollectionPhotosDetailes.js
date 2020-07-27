import { getUserCollectionPhotosDetailes } from '../Actions/types.js';

const INIALSTATE = JSON.parse(localStorage.getItem("collection-id-title-user")) || {};

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getUserCollectionPhotosDetailes:
            return action.payload;
        default:
            return state;
    }
};