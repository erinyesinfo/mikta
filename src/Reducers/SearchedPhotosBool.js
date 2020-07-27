import { getSearchedPhotosBool_type } from '../Actions/types';

const INIALSTATE = false;

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getSearchedPhotosBool_type:
            return action.payload;
        default:
            return state;
    }
};