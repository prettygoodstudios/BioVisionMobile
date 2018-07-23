import { combineReducers } from 'redux';

import auth from "./auth";
import locations from "./locations";

const rootReducer = combineReducers({
  auth,
  locations
});

export default rootReducer;
