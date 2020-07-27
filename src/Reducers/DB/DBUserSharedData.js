import { getDBUserSharedData_type } from '../../Actions/types.js';

const INIALSTATE = JSON.parse(localStorage.getItem("shareData-db")) || [];

export default (state = INIALSTATE, action) => {
  switch (action.type) {
    case getDBUserSharedData_type:
      return action.payload;
    default:
      return state;
  }
};