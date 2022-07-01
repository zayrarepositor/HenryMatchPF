import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  CLEAR_USER_DETAIL,
  FILTER_USERS_BY_GENDER,
  GET_USER_BY_NICKNAME,
  /*  GET_USER_BY_GENDERINT, */
  // GET_USER_LIKES,
  // GET_USER_MATCHES,
  // FILTER_BY_PREFERENCE,
  // FILTER_BY_INTEREST,
  // SORT_BY_AGE,
} from "./types";

//YA SE SETEO EN EL PACKAGE.JSON ==> NO OLVIDES EL npm install
import axios from "axios";



//URL PARA LOS USUARIOS
const url = "https://henrymatch-pg.herokuapp.com/users";


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

//RUTA QUE ESTAS USANDO "https://henrymatch-pg.herokuapp.com/users/nickname";
export function getUserByNick(nickname) {
  return async function (dispatch) {
    try {
      const user = await axios.get(url + `/${nickname}`);
      return dispatch({
        type: GET_USER_BY_NICKNAME,
        payload: user.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//RUTA QUE ESTAS USANDO "https://henrymatch-pg.herokuapp.com/users";
export function createUser(data) {
  return async function (dispatch) {
    try {
      const user = await axios.post(url, data);
      return dispatch({
        type: CREATE_USER,
        payload: user.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function updateUser(id, data) {
  return async function (dispatch) {
    try {
      const user = await axios.put(`https://henrymatch-pg.herokuapp.com/usersID/${id}`, data);
      
      return dispatch({
        type: UPDATE_USER,
        payload: user.data,
      });
    } catch (error) {
      return error;
    }
  }; 
} 

/* export function updateUser(id, data) {
  return async (dispatch) => {
    try {
      const put = await axios.put(
        `https://henrymatch-pg.herokuapp.com/usersId/${id}`,
        data
      );
      return put;
    } catch (error) {
      console.log(error);
    }
  };
} */

//----ACTION CREATORS---//EL RESTO DE LAS FUNCIONES VAN AQUI:

export function filterByGender(gender) {
  return {
    type: FILTER_USERS_BY_GENDER,
    payload: gender,
  };
}

export function clearUserDetail(payload) {
  return {
    type: CLEAR_USER_DETAIL,
    payload: payload,
  };
}

//FUNCION PARA CLEAR_MESSAGE

/* cuando le das a la imagen a laderecha se actuialice un PUT en el usuario el id de quien le dio like */
