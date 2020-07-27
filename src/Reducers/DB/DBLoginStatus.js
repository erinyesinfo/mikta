import { getDBLoginStatus_type } from '../../Actions/types.js';

const INIALSTATE = document.cookie.includes("214082ee-34f0-4316-8881-a474d8c82d7b=a474d8c82d7b-8881-4316-34f0-214082ee") ? true:false;

export default (state = INIALSTATE, action) => {
  switch (action.type) {
    case getDBLoginStatus_type:
      return action.payload;
    default:
      return state;
  }
};