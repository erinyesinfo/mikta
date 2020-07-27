import { getUserLikesPhoto } from '../Actions/types';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getUserLikesPhoto:
            return action.payload;
        default:
            return state;
    }
};