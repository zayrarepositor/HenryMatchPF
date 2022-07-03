import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  CLEAR_USER_DETAIL,
  FILTER_USERS_BY_GENDER,
  GET_USER_BY_NICKNAME,
  UPDATE_MATCH,
  FILTERS_BY_ME,
  UPDATE_IMG,
  /*  GET_USER_BY_GENDER,
  GET_USER_BY_GENDERINT, */
} from "../actions/types.js";

const initialState = {
  users: [], //NO MODIFICAR
  usersBackup: [], //ESTE LO USO PARA EMPEZAR FILTERS & SORTERS
  usersSelected: [], //ESTE LO USO PARA ALMACENAR EL RESULTADO DE FILTERS & SORTERS
  userDetail: [], //USADO TAMBIEN PARA CLEAR_USER_DETAIL

  // OPCIONALES?
  // message: [], //POR EJ:AQUI  GUARDE LA RESPUESTA DEL SERVIDOR DESPUES DEL POST Y EL PUT
  gender: [],
  genderInt: [],
  //userFilt:[],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        users: action.payload,
        usersBackup: action.payload,
      };
    }
    case GET_USER_BY_NICKNAME: {
      return { ...state, userDetail: action.payload };
    }

    case CREATE_USER: {
      return { ...state, userDetail: action.payload };
    }

    //   return { ...state, message: action.payload, userDetail: action.payload };
    // } //MESSAGE PODRIA TRAER INFO PARA UN COMPONENTE MODAL DE NOTIFICACION

    case UPDATE_USER: {
      return {
        ...state,
        message: action.payload,
      };
    }
    case UPDATE_IMG: {
      return {
        ...state,
        message: action.payload,
      };
    }
    case UPDATE_MATCH: {
      return { 
        ...state, message: action.payload };
    }

    case FILTERS_BY_ME: {
      //todos mis usuarios
      const allusersMe = state.usersBackup;
      //mi id
      const miID = state.userDetail?._id;
      console.log(miID)
      const myGenderInt = state.userDetail?.genderInt
      const filterByGender = allusersMe.filter(u => u.gender === myGenderInt)
      
      const usersFilterByLikeReceived = filterByGender.filter(
        (e) => !e.likeReceived.includes(miID)
      )
      const usersFilterByDisLikeReceived = usersFilterByLikeReceived.filter(
        (e) => !e.dislikeReceived.includes(miID)
      )
      //mis usuarios excepto los que recibieron mis likes
     /*  const usersFilterByLikeReceived = filterByGender.filter(
        (e) => !e.likeReceived.includes(miID)
      ); */

       //mis usuarios excepto los que recibieron mis dislikes
      /* const usersFilterByDisLikeReceived = filterByGender.filter(
        (e) => !e.dislikeReceived.includes(miID)
      ); */
      //const totalArray = usersFilterByDisLikeReceived.concat(usersFilterByLikeReceived)
      const FinalFiltered = new Set(usersFilterByDisLikeReceived)
      /* FinalFiltered.add(
        usersFilterByDisLikeReceived *//* , */
       /*  usersFilterByLikeReceived */
      /* ) */
      const finalArray = [...FinalFiltered]

      console.log("usersFilterByLikeReceived",usersFilterByLikeReceived);
      console.log("usersFilterByDisLikeReceived",usersFilterByDisLikeReceived);
      console.log("finalArray ",finalArray );

      return { 
        ...state, 
        usersSelected: finalArray};
    }

    case CLEAR_USER_DETAIL: {
      return { ...state, userDetail: [] };
    }

    case FILTER_USERS_BY_GENDER: {
      const allusersGender = state.usersBackup;
      const usersFilterByGender =
        action.payload === "male"
          ? allusersGender.filter((e) => e.gender === "male")
          : action.payload === "female"
          ? allusersGender.filter((e) => e.gender === "female")
          : allusersGender;
      return { ...state, usersSelected: usersFilterByGender };
    }

    default:
      return state;
  }
}

/* 
//Usuario Puesto a la Fuerza
{
  "_id": "62b92ff181a59e8d4bbea54d",
  "name": "YoMismooo",
  "age": 24,
  "birthday": "03/12/1993",
  "nickname": "111222333",
  "email": "pedritoelmas@gmail.com",
  "premium": false,
  "active": false,
  "image": "https://image.shutterstock.com/image-photo/young-handsome-chinese-call-center-600w-1925534732.jpg",
  "gender": "male",
  "genderInt": "male",
  "description": "Me gusta jugar al futbol",
  "henryLevel": "m2",
  "likeReceived": ["62ba3a30fdd8f0d98bfb314a"],
  "likeGiven": ["62ba3a30fdd8f0d98bfb314a"],
  "dislikeGiven": ["62ba3a30fdd8f0d98bfb314a"],

  "matches": [],
  "city": "Guatire",
  "job": "Call center",
  "career": "fullstack",
  "interests": [
      "cine"
  ],
  "createdAt": "2022-06-27T04:20:01.368Z",
  "updatedAt": "2022-06-27T04:20:01.368Z",
  "__v": 0
}
 */
