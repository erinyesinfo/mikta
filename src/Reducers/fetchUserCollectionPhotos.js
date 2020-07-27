import { getUserCollectionPhotos } from '../Actions/types.js';

const INIALSTATE = JSON.parse(localStorage.getItem("collection-photos")) || [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getUserCollectionPhotos:
            return action.payload;
        default:
            return state;
    }
};