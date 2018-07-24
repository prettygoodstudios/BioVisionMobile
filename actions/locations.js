import axios from "axios";

import {LOCATIONS_INDEX, GET_LOCATION} from "./types";
import {ROOT_URL} from "../webService";

export function locationsIndex(success, error){
  return function(dispatch){
    axios.get(ROOT_URL+"/locations").then((data) => {
      dispatch({
        type: LOCATIONS_INDEX,
        payload: data.data
      });
      success(data.data);
    }).catch((e) => {
      error();
    });
  }
}

export function getLocation(id ,success, error){
  return function(dispatch){
    axios.get(ROOT_URL+"/locations/"+id).then((data) => {
        dispatch({
          type: GET_LOCATION,
          payload: data.data
        });
        success(id);
    }).catch((e) => {
      error(e);
    });
  }
}
