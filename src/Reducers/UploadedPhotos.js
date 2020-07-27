import { getUploadPhotos } from '../Actions/types.js';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getUploadPhotos:
            return action.payload;
        default:
            return state;
    }
};