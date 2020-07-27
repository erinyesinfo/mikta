import { getPostSearchPhotos } from '../Actions/types';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getPostSearchPhotos:
            return action.payload;
        default:
            return state;
    }
};