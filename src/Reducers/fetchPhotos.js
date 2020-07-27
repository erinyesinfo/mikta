import { getPhotos } from '../Actions/types.js';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getPhotos:
            return action.payload;
        default:
            return state;
    }
};