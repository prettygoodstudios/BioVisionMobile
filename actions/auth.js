import axios from "axios";

import {SIGN_IN} from "./types";
import {ROOT_URL} from "../webService";

export function signIn({email, password}, success, error){
  return function(dispatch){
    axios.post(ROOT_URL+"/sessions",{ email: email, password: password}).then((data) => {
      dispatch({
        type: SIGN_IN,
        payload: data.data
      });
      success();
    }).catch((e) => {
      error(e);
    });
  }
}
