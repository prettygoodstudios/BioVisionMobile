import {CREATE_ENCOUNTER, GET_ENCOUNTER, GET_ENCOUNTER_BY_DATE} from "../actions/types";

const INIT_STATE = {
  encounter: {},
  encounters: []
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case CREATE_ENCOUNTER:
      return {
        ...state,
        encounter: action.payload
      }
      break;
    case GET_ENCOUNTER:
      return{
        ...state,
        encounter: action.payload
      }
      break;
    case GET_ENCOUNTER_BY_DATE:
      console.log("My Encounters", action.payload);
      return{
        ...state,
        encounters: action.payload
      }
      break;
    default: return state;
  }
}
