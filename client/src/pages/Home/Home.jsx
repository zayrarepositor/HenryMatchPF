//======PAQUETES Y LIBRERIAS
import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

//======IMPORTACIONES DE COMPONENTES
import LoginButton from "../../components/LoginButton/LoginButton";
import Header from "../../components/Header/Header";
import Cards from "../../components/Card";
import Loader from "../../components/Loader/Loader";
//import Detail from "../../components/Detail/Detail";
import BottomBar from "../../components/BottomBar";
import Copyright from "../../components/Copyright/Copyright";
// import MyNetwork from "../../components/Chat/MyNetwork";
// import ChatRoom from "../ChatRoom/ChatRoom";

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { filterByMe, filterUserByMatches, getUsers } from "../../redux/actions";
import { filterByGender } from "../../redux/actions";
import { getUserByNick, clearUserDetail } from "../../redux/actions/index";

//======ESTILO E IMAGENES
import { Typography, Link, Box, Grid, Avatar, CardMedia } from "@mui/material";
import HenryGirl from "../../assets/HenryGirl.jpg";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Modal from "../../components/Modal/Modal";
import SwipeableEdgeDrawer from "../../components/ChatBox/ChatBox";
import MyNetwork from "../../components/Chat/MyNetwork";

const Home = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const userMatch = useSelector((state) => state.userMatch);
  const users = useSelector((state) => state.users);
  const userMatches = useSelector((state) => state.userMatches);
  const userDetail = useSelector((state) => state.userDetail);
  //MODAL PARA CREAR USUARIO
  const [modal, setModal] = useState(false);

  //PARA ABRIR MODAL PREMIUM
  const [premium, setPremium] = useState(false);

  //IDENTIFICO CUANDO SE CREO UN USUARIO NUEVO
  const [newUser, setNewUser] = useState(false);

  //PARA LLENAR EL STORE CON TODOS LOS USUARIOS
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (user) {
      const userid = {
        name: user.name,
        id: user.sub,
        photoUrl: user.picture,
        email: user.email || "exampleEmail@gmail.com",
        description: "im Ready to get my first HenryMatch",
        role: "user",
      };

      window.localStorage.setItem("currentTalkjsUser", JSON.stringify(userid));
    }
  }, [user]);

  //PARA ABRIR MODAL SOLO CUANDO EL USUARIO NO ESTA EN LA DB
  useEffect(() => {
    if (isAuthenticated === true) {
      //ME GUARDO EL SUB (NUESTRO NICKNAME) DEL USUARIO DE AUTH0 EN ESTA VARIABLE
      const localUserNickname = user.sub;

      //EN ESTA VARIABLE SER GUARDA EL LOCAL USER SI ESTA EN LA DB
      const userInDb = users.find((u) => u.nickname === localUserNickname);

      //======> SI ESTAS EN LA DB =======> console.log(userInDb);
      //SI NO HAY NADA EN userInDb SE ABRE EL MODAL
      if (!userInDb || userInDb === undefined) {
        setModal(true);
      } else {
        setModal(false);
        //SI EL USUARIO SI ESTABA EN NUESTRA DB SE LLENA EL userDetail DEL STORE
        dispatch(getUserByNick(localUserNickname));
      }
    }
  }, [isAuthenticated]);

  //PARA FILTRAR USUARIO POR GENERO
  /*   useEffect(() => {
    dispatch(filterByGender(userDetail?.genderInt));
     }, [modal]); */

  //PARA MONTAR CON LOS FILTROS GENERO,LIKES, DISLIKES APLICADOS
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

  return (
    <>
      {/* <ChatRoom
        usersDetail={userDetail}
        users={users}
        /> */}

      {isLoading && (
        <>
          <Loader />
        </>
      )}
      <Modal modal={modal} setModal={setModal} setNewUser={setNewUser}></Modal>
      {isAuthenticated ? (
        <Grid>
          <CssBaseline />
          <Header />
          <Cards setPremium={setPremium} />
          <BottomBar premium={premium} setPremium={setPremium} />
          <Box
            position={"absolute"}
            width={300}
            height={400}
            bottom={66}
            right={20}
            sx={{ color: "dark.main" }}>
            <SwipeableEdgeDrawer />
          </Box>
          <MyNetwork userDetail={userDetail} userMatches={userMatches} />
        </Grid>
      ) : (
        <>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${HenryGirl})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "start",
              }}
            />

            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <Typography variant="h4">
                    Matchea y chateá con Alumnos de Henry!
                    {/*    {users[0]?.name} */}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      right: 0,
                      left: 0,
                      border: 0,
                      marginTop: 20,
                    }}>
                    <LoginButton />
                  </Box>
                  <Copyright sx={{ mt: 25 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
