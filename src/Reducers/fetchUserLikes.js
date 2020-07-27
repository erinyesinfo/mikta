import { getUserLikes } from '../Actions/types.js';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getUserLikes:
            return action.payload;
        default:
            return state;
    }
};