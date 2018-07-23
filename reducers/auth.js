import {SIGN_IN} from "../actions/types";

const INIT_STATE = {
  user: {
    authenticated: false
  }
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case SIGN_IN:
      const user = {
        ...action.payload,
        authenticated: true
      };
      return {
        ...state,
        user: user
      }
      break;
    default: return state;
  }
}
