import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  CLEAR_USER_DETAIL,
} from "../actions/types.js";

const initialState = {
  users: [],
  usersSelected: [], //USADO PARA FILTERS & SORTERS
  userDetail: [], //USADO TAMBIEN PARA CLEAR_USER_DETAIL

  // OPCIONALES?
  message: [], //POR EJ:AQUI  GUARDE LA RESPUESTA DEL SERVIDOR DESPUES DEL POST Y EL PUT
  gender: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        users: action.payload,
        usersSelected: action.payload,
      };
    }

    case CREATE_USER: {
      return { ...state, message: action.payload };
    }

    case UPDATE_USER: {
      return { ...state, message: action.payload };
    }

    case CLEAR_USER_DETAIL: {
      return { ...state, userDetail: [] };
    }

    default:
      return state;
  }
}
