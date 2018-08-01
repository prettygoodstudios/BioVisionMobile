import { combineReducers } from 'redux';

import auth from "./auth";
import locations from "./locations";
import species from "./species";
import encounters from "./encounters";
import loading from "./loading";

const rootReducer = combineReducers({
  auth,
  locations,
  species,
  encounters,
  loading
});

export default rootReducer;
