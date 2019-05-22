import { combineReducers } from "redux";
import listings from './listingsReducer'
import users from "./userReducer";

export default combineReducers({
  users,
  listings,
});