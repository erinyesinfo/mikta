import { getComments } from '../Actions/types.js';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getComments:
            return action.payload;
        default:
            return state;
    }
};