
import { FETCH_USER } from "../actions/types";

export default (state = {
    user: {},
    listings: {},
  }, action) => {
  let newState = {...state}
  switch (action.type) {
    case FETCH_USER:
      return {...state, user: action.payload}
    default:
      return newState;
  }
};