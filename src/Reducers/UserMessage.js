import { getUserMessage_type } from '../Actions/types';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getUserMessage_type:
            return action.payload;
        default:
            return state;
    }
};