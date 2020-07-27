import { getUserCollectionPhotos_type } from '../Actions/types.js';

const INIALSTATE = {};

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getUserCollectionPhotos_type:
            return action.payload;
        default:
            return state;
    }
};