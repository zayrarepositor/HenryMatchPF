//======PAQUETES Y LIBRERIAS
import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

//======IMPORTACIONES DE COMPONENTES
import Header from "../../components/Header/Header";
import Cards from "../../components/Card";
import Loader from "../../components/Loader/Loader";
import BottomBar from "../../components/BottomBar";
import Landing from "../../pages/Landing/Landing";
//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { filterByMe, filterUserByMatches, getUsers } from "../../redux/actions";
import { getUserByNick, updateMatches } from "../../redux/actions/index";

//======ESTILO E IMAGENES
import { Grid } from "@mui/material";
import Modal from "../../components/Modal/Modal";
import Ban from "../../components/Ban";

const Home = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const users = useSelector((state) => state.users);
  const userMatches = useSelector((state) => state.userMatches);
  const userDetail = useSelector((state) => state.userDetail);

  const iAmActive = userDetail?.active;

  let allAdmins = [];

  let filterAdmins = users.filter((user) => {
    if (user.isAdmin === true) {
      allAdmins.push(user);
    }
  });

  //MODAL PARA CREAR USUARIO
  const [modal, setModal] = useState(false);

  //PARA ABRIR MODAL PREMIUM
  const [premium, setPremium] = useState(false);

  //IDENTIFICO CUANDO SE CREO UN USUARIO NUEVO
  const [newUser, setNewUser] = useState(false);

  //ME TRAIGO EL USER DE AUTH0 DEL LOCAL STORAGE A ESTE ESTADO LOCAL
  const [localUser, setLocalUser] = useState(
    localStorage.getItem("localUser")
      ? JSON.parse(localStorage.getItem("localUser"))
      : []
  );
  //IDENTIFICO CUANDO SE HA GENERADO UN CAMBIO EN CARDS
  const [cardMoved, setCardMoved] = useState(false);

  //IDENTIFICO CUANDO SE HA GENERADO UN CAMBIO EN CARDS
  const [match, setMatch] = useState(false);

  //OBJETO USER DE AUTH0 Y SU SUB (NUESTRO NICKNAME)
  const userAuth = user;

  //PARA LLENAR EL LOCALSTORAGE CON EL USER DE AUTH0
  useEffect(() => {
    if (userAuth) {
      localStorage.setItem("localUser", JSON.stringify(userAuth) ?? []);
    }
  }, [userAuth]);

  //PARA LLENAR EL STORE CON TODOS LOS USUARIOS Y USERDETAIL SI EL USUARIO YA ESTA LOGUEADO
  useEffect(() => {
    //SIN CONDICIONAL
    dispatch(getUsers());
    //EL USUARIO ACTUAL ESTA EN LA DB?
    const userInDb = users.find((u) => u.nickname === userAuth.sub);

    //ACTUALIZO USERDETAIL Y FILTROS AL VOLVER A HOME
    if (isAuthenticated === true && userInDb) {
      dispatch(getUserByNick(userAuth.sub));
      dispatch(filterByMe());
      console.log("uuuuuuuuser in DB", userInDb);
    }

    //PARA FILTRAR LO QUE RENDERIZA CARD CUANDO NO SE ABRIO EL MODAL
    if (isAuthenticated === true && newUser === true) {
      dispatch(filterByMe());
      setNewUser(false);
    } else {
      console.log("USER DETAIL", Object.keys(userDetail).length > 0);
    }
  }, []);
  //PARA CHAT2
  useEffect(() => {
    if (user) {
      const userid = {
        name: user.name,
        id: user.sub,
        photoUrl: user.picture,
        email: user.email || "exampleEmail@gmail.com",
        description: "im Ready to get my first HenryMatch",
        role: "default",
      };

      window.localStorage.setItem("currentTalkjsUser", JSON.stringify(userid));
    }
  }, [user]);

  //PARA ABRIR MODAL SOLO CUANDO EL USUARIO NO ESTA EN LA DB
  useEffect(() => {
    if (isAuthenticated === true) {
      //EL USUARIO ACTUAL ESTA EN LA DB?
      const userInDb = users.find((u) => u.nickname === userAuth.sub);

      if (userInDb) {
        setModal(false);
        //SI EL USUARIO SI ESTABA EN NUESTRA DB SE LLENA EL userDetail DEL STORE
        dispatch(getUserByNick(userAuth.sub));
        dispatch(filterByMe());
      } else {
        setModal(true);
      }
    }
  }, [isAuthenticated]);

  //PARA FILTRAR LO QUE RENDERIZA CARD CUANDO SI  SE ABRIO EL MODAL
  useEffect(() => {
    if (isAuthenticated === true && newUser === true) {
      dispatch(filterByMe());
      setNewUser(false);
    } else {
      console.log("USER DETAIL", Object.keys(userDetail).length > 0);
    }
  }, [newUser]);

  //PARA ACTUALIZAR DESPUES DE MOVER CARTAS O MATCHES
  useEffect(() => {
    if (cardMoved === true || match === true) {
      dispatch(getUsers());
      console.log("se han movido caaaaards o se ha matcheado");
      setCardMoved(false);
      setMatch(false);
    }
  }, [cardMoved, match]);

  //PARA ACTUALIZAR DESPUES DE MOVER CARTAS O MATCHES
  useEffect(() => {
    if (cardMoved === true || match === true) {
      dispatch(getUserByNick(userAuth.sub));
      dispatch(filterByMe());
    }
  }, [updateMatches]);

  /*   //PARA MONTAR CON LOS FILTROS GENERO,LIKES, DISLIKES APLICADOS
  useEffect(() => {
    dispatch(filterByMe());
  }, [userDetail]);

  useEffect(() => {
    if (user) {
      dispatch(getUserByNick(user.sub)).then(() =>
        dispatch(filterUserByMatches(userDetail?._id))
      );
    }
  }, [user, userDetail?._id]);
 */
  return (
    <>
      <Modal modal={modal} setModal={setModal} setNewUser={setNewUser}></Modal>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      {isAuthenticated && iAmActive === false ? (
        <>
          <Ban userDetail={userDetail} users={users} allAdmins={allAdmins} />
        </>
      ) : isAuthenticated ? (
        <Grid>
          <Header />
          <Cards
            setPremium={setPremium}
            setCardMoved={setCardMoved}
            setMatch={setMatch}
          />
          <BottomBar
            premium={premium}
            setPremium={setPremium}
            userDetail={userDetail}
          />
        </Grid>
      ) : (
        <Landing></Landing>
      )}
    </>
  );
};

export default Home;
