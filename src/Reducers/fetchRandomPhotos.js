import { getRandomPhotos } from '../Actions/types.js';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getRandomPhotos:
            return action.payload;
        default:
            return state;
    }
};