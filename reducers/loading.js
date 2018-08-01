import {SET_LOADING} from "../actions/types";

const INIT_STATE = {
  loading: false
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
      break;
    default: return state;
  }
}
