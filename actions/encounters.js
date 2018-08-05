import axios from "axios";

import {CREATE_ENCOUNTER, GET_ENCOUNTER, UPDATE_ENCOUNTER, GET_ENCOUNTER_BY_DATE, GET_USER_ENCOUNTERS, GET_MONTH_ENCOUNTERS} from "./types";
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

export function updateEncounter(params, success, error){
  return function(dispatch){
    axios.put(ROOT_URL+"/encounters/"+params.id, {...params}).then((data) => {
      if (!data.data.errors){
        dispatch({
          type: UPDATE_ENCOUNTER,
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

export function getByDate(params, success, error){
  return function(dispatch){
    axios.get(ROOT_URL+"/encounters/get_by_date/range"+`?start=${params.start}&end=${params.end}`).then((d) => {
      dispatch({
          type: GET_ENCOUNTER_BY_DATE,
          payload: d.data
      });
      success();
    }).catch((e) => {
      error(e);
    });
  }
}

export function getUserEncounters(user, success, error){
  return function(dispatch){
    axios.get(`${ROOT_URL}/encounters/user/${user}`).then((d) => {
      dispatch({
        type: GET_USER_ENCOUNTERS,
        payload: d.data
      });
      success();
    }).catch((e) => {
      error(e);
    });
  }
}

export function getMonthEncounters({start, end}, success, error){
  return function(dispatch){
    axios.get(`${ROOT_URL}/encounters/get_by_month/range?start=${start}&end=${end}`).then((d) => {
      dispatch({
        type: GET_MONTH_ENCOUNTERS,
        payload: d.data
      });
      success();
    }).catch((e) => {
      error(e);
    });
  }
}
