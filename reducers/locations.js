import {LOCATIONS_INDEX, GET_LOCATION, GET_STATES} from "../actions/types";

const INIT_STATE = {
  locations: [],
  currentLocation: {},
  states: []
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
    case GET_STATES:
      return{
        ...state,
        states: action.payload
      }
      break;
    default: return state;
  }
}
