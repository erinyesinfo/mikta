import { getNavsLength_type } from '../../Actions/types.js';

const INIALSTATE = JSON.parse(localStorage.getItem("navs-length")) || { shared: '', likes: '', collections: '' };

export default (state = INIALSTATE, action) => {
  switch (action.type) {
    case getNavsLength_type:
      return action.payload;
    default:
      return state;
  }
};