import { getSearchedPhotos } from '../Actions/types';

const INIALSTATE = false;

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getSearchedPhotos:
            return action.payload;
        default:
            return state;
    }
};