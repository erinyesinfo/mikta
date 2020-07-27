import { getNewPost } from '../Actions/types';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getNewPost:
            return action.payload;
        default:
            return state;
    }
};