import axios from "axios";

import {SIGN_IN, AUTHENTICATE, LOG_OUT, CREATE_USER} from "./types";
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

export function logOut(success){
  return function(dispatch){
    dispatch({
      type: LOG_OUT,
      payload: {
        user: {},
        authenticated: false
      }
    });
    success();
  }
}

export function createAccount(params, success, error){
  return function(dispatch){
    axios.post(`${ROOT_URL}/sessions/create_user`, params).then((data) => {
      if(!data.data.errors){
        dispatch({
          type: CREATE_USER,
          payload: data.data
        });
        success(data.data);
      }else{
        console.log(data.data["errors"]);
        error(`${Object.keys(data.data.errors)[0]} ${Object.values(data.data.errors)[0]}`);
      }
    }).catch((e) => {
      console.log("The errors",e);
      error("Could not establish a connection with the server.");
    });
  }
}
