import { getLikesData } from '../Actions/types';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getLikesData:
            return action.payload;
        default:
            return state;
    }
};