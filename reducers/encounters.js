import {CREATE_ENCOUNTER, GET_ENCOUNTER, GET_ENCOUNTER_BY_DATE, GET_USER_ENCOUNTERS, GET_MONTH_ENCOUNTERS} from "../actions/types";

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
      return{
        ...state,
        encounters: action.payload
      }
      break;
    case GET_USER_ENCOUNTERS:
      return{
        ...state,
        encounters: action.payload
      }
      break;
    case GET_MONTH_ENCOUNTERS:
      return{
        ...state,
        encounters: action.payload
      }
    default: return state;
  }
}
