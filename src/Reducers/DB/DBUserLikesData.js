import { getDBUserLikesData_type } from '../../Actions/types.js';

const INIALSTATE = JSON.parse(localStorage.getItem("likesData-db")) || [];

export default (state = INIALSTATE, action) => {
  switch (action.type) {
    case getDBUserLikesData_type:
      return action.payload;
    default:
      return state;
  }
};