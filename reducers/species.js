import {ALL_SPECIES} from "../actions/types";

const INIT_STATE = {
  species: []
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case ALL_SPECIES:
      return {
        ...state,
        species: action.payload
      }
      break;
    default: return state;
  }
}
