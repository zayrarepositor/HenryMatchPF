import {
  GET_USERS,
  GET_USER_BY_GENDER,
  GET_USER_BY_ID,
  GET_USER_LIKES,
  GET_USER_MATCHES,
  FILTER_BY_PREFERENCE,
  FILTER_BY_INTEREST,
  SORT_BY_AGE,
  CREATE_USER,
  UPDATE_USER,
  CLEAR_USER_DETAIL,
} from "./types";

//YA SE SETEO EN EL PACKAGE.JSON ==> NO OLVIDES EL npm install
import axios from "axios";

const url = "https://henry-pg.herokuapp.com/users";

//----THUNK FUNCTIONS---// LAS QUE HACEN REQUIRES A LA DB Y SON ASINCRONAS

export function getUsers() {
  return async function (dispatch) {
    try {
      const users = await axios.get(url);
      return dispatch({
        type: GET_USERS,
        payload: users.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//FUNCTION SIN REVISAR!!! URL A REVISAR!! CUANDO LO HAGAS BORRA EL COMENTARIO
export function getUsersById(id) {
  return async function (dispatch) {
    try {
      const users = await axios.get(url + `/${id}`); //A REVISAR
      return dispatch({
        type: GET_USER_BY_ID,
        payload: users.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//FUNCION A REVISAR!!! CUANDO LO HAGAS BORRA ESTE COMENTARIO
export function createUser(data) {
  return async function (dispatch) {
    try {
      const user = await axios.post(url, data);
      console.log(user.data)
      return dispatch({
        type: CREATE_USER,
        payload: user.data
      });
    } catch (error) {
      return error;
    }
  };
}

export function updateUser(id, data) {
  return async function (dispatch) {
    try {
      const user = await axios.put(url + `/${id}`, data);
      return dispatch({
        type: UPDATE_USER,
        payload: user.data,
      });
    } catch (error) {
      return error;
    }
  };
}

//----ACTION CREATORS---//EL RESTO DE LAS FUNCIONES VAN AQUI:

export function getUsersByGender(gender) {
  return dispatch({
    type: GET_USER_BY_GENDER,
    payload: users.data,
  });
}

export function clearUserDetail(payload) {
  return {
    type: CLEAR_USER_DETAIL,
    payload,
  };
}

//FUNCION PARA CLEAR_MESSAGE
