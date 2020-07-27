import { getDBUserCollectionsData_type } from '../../Actions/types.js';

const INIALSTATE = JSON.parse(localStorage.getItem("collectionData-db")) || [];

export default (state = INIALSTATE, action) => {
  switch (action.type) {
    case getDBUserCollectionsData_type:
      return action.payload;
    default:
      return state;
  }
};