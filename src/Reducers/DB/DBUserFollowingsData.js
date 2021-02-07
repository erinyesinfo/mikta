import { getDBUserFollowingsData_type } from '../../Actions/types.js';

const INIALSTATE = JSON.parse(localStorage.getItem("following-db")) || [];

export default (state = INIALSTATE, action) => {
  switch (action.type) {
    case getDBUserFollowingsData_type:
      return action.payload;
    default:
      return state;
  }
};