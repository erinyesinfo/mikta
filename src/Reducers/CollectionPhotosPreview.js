import { getCollectionPhotosPreview_type } from '../Actions/types.js';

const INIALSTATE = '';

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getCollectionPhotosPreview_type:
            return action.payload;
        default:
            return state;
    }
};