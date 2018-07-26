import {CREATE_ENCOUNTER} from "../actions/types";

const INIT_STATE = {
  encounter: {}
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case CREATE_ENCOUNTER:
      return {
        ...state,
        encounter: action.payload
      }
      break;
    default: return state;
  }
}