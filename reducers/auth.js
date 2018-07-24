import {SIGN_IN, AUTHENTICATE, LOG_OUT} from "../actions/types";

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
    case AUTHENTICATE:
      const user2 = {
        ...action.payload,
        authenticated: true
      };
      return {
        ...state,
        user: user2
      }
      break;
    case LOG_OUT:
      return {
        ...state,
        user: {},
        authenticated: false
      }
      break;
    default: return state;
  }
}
