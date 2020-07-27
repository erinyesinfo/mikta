import { getUserPhotos } from '../Actions/types.js';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getUserPhotos:
            return action.payload;
        default:
            return state;
    }
};