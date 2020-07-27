import { getNewPost_UploadPhotos_type } from '../Actions/types.js';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getNewPost_UploadPhotos_type:
            return action.payload;
        default:
            return state;
    }
};