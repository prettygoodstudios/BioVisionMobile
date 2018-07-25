import { combineReducers } from 'redux';

import auth from "./auth";
import locations from "./locations";
import species from "./species";

const rootReducer = combineReducers({
  auth,
  locations,
  species
});

export default rootReducer;
