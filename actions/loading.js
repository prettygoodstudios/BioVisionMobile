import {SET_LOADING} from "./types";

export function setLoading(val){
  return {
    type: SET_LOADING,
    payload: val
  }
}
