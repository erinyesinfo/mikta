import { getNewMessage } from '../Actions/types';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getNewMessage:
            return action.payload;
        default:
            return state;
    }
};