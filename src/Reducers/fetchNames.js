import { getNames } from '../Actions/types.js';

const INIALSTATE = {};

export default (state = [INIALSTATE], action) => {
    switch (action.type) {
        case getNames:
            return action.payload;
        default:
            return state;
    }
};