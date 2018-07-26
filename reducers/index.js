import { combineReducers } from 'redux';

import auth from "./auth";
import locations from "./locations";
import species from "./species";
import encounters from "./encounters";

const rootReducer = combineReducers({
  auth,
  locations,
  species,
  encounters
});

export default rootReducer;
