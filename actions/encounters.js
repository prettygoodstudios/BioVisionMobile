import axios from "axios";

import {CREATE_ENCOUNTER, GET_ENCOUNTER} from "./types";
import {ROOT_URL} from "../webService";

export function createEncounter(params, success, error){
  return function(dispatch){
    axios.post(ROOT_URL+"/encounters",{...params}).then((data) => {
      if (!data.data.errors){
        dispatch({
          type: CREATE_ENCOUNTER,
          payload: data.data
        });
        success(data.data.id);
      }else{
        error(data.data.errors);
      }
    }).catch((e) => {
      error(e);
    });
  }
}

export function getEncounter(id, success, error){
  return function(dispatch){
    axios.get(ROOT_URL+"/encounters/"+id).then((data) => {
      dispatch({
        type: GET_ENCOUNTER,
        payload: data.data
      });
      success();
    }).catch((e) => {
      error(e);
    });
  }
}
