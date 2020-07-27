import { getUserCollection } from '../Actions/types.js';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getUserCollection:
            return action.payload;
        default:
            return state;
    }
};