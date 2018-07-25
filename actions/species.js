import axios from "axios";

import {ALL_SPECIES} from "./types";
import {ROOT_URL} from "../webService";

export function allSpecies(success, error){
  return function(dispatch){
    axios.get(ROOT_URL+"/species").then((data) => {
      console.log("Species Here", data.data);
      dispatch({
        type: ALL_SPECIES,
        payload: data.data
      });
      success(data.data);
    }).catch((e) => {
      error();
    });
  }
}
