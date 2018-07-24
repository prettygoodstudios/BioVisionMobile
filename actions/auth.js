import axios from "axios";

import {SIGN_IN, AUTHENTICATE} from "./types";
import {ROOT_URL} from "../webService";

export function signIn({email, password}, success, error){
  return function(dispatch){
    axios.post(ROOT_URL+"/sessions",{ email: email, password: password}).then((data) => {
      dispatch({
        type: SIGN_IN,
        payload: data.data
      });
      success(data.data);
    }).catch((e) => {
      error(e);
    });
  }
}

export function authenticate({email, token}, success, error){
  return function(dispatch){
    axios.post(ROOT_URL+"/sessions/authenticate",{ email: email, token: token}).then((data) => {
      dispatch({
        type: AUTHENTICATE,
        payload: data.data
      });
      success(data.data);
    }).catch((e) => {
      error(e);
    });
  }
}
