import { getNewPost_type } from '../Actions/types';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getNewPost_type:
            return action.payload;
        default:
            return state;
    }
};