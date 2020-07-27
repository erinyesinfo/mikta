import { getLocalStorageLoginStatus_type } from '../../Actions/types.js';

const INIALSTATE = JSON.parse(localStorage.getItem("f11cce98b5b5")) || false;

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getLocalStorageLoginStatus_type:
            return action.payload;
        default:
            return state;
    }
};