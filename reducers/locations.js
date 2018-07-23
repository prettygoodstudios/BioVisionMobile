import {LOCATIONS_INDEX, GET_LOCATION} from "../actions/types";

const INIT_STATE = {
  locations: [],
  currentLocation: {}
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case LOCATIONS_INDEX:
      return {
        ...state,
        locations: action.payload
      }
      break;
    case GET_LOCATION:
      return {
        ...state,
        currentLocation: action.payload
      }
      break;
    default: return state;
  }
}
