//======PAQUETES Y LIBRERIAS
import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

//======IMPORTACIONES DE COMPONENTES
import LoginButton from "../../components/LoginButton/LoginButton";
import Header from "../../components/Header/Header";

import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import Detail from '../../components/Detail/Detail';

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { getUsers } from "../../redux/actions";

//======ESTILO E IMAGENES
import { Typography, Link, Box, Grid, Avatar, CardMedia } from "@mui/material";
import HenryGirl from "../../assets/HenryGirl.jpg";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TemporaryDrawer from './../../components/SideBar/index';

//PABLO CUANDO PUEDAS CONTAME DE ESTA FUNCION <`*.*´> (ZAYRA)
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <Link color="inherit" href="#">
        Henry Match
      </Link>{" "}
      {new Date().getFullYear()}
      {". "}
      Hecho con <FavoriteIcon fontSize="small" /> por alumnos de Henry
    </Typography>
  );
}

const Home = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const usersSelected = useSelector((state) => state.usersSelected);

  useEffect(() => {
    dispatch(getUsers());
    //AQUI VA UNA FUNCION PARA QUE, EN EL MOMENTO EN QUE ES AUTENTICADO EL USUARIO, BUSQUE EN USERSSELECTED (parte del store) A VER SI TENEMOS ALMACENADO A ALGUIEN CON ESE MAIL (FIND) => CON ESE USUARIO, SI LO TENEMOS EN USERSSELECTED, PUEDO SETEAR UN ESTADO LOCAL(localUser, setLocalUser) O EL USERDETAIL DEL STORE (A PENSAR CUAL NOS CONVIENE MAS).
    //EN LOS DATOS DE ESE USUARIO ESTA EL GENERO QUE BUSCA(genderInt) ASI QUE EN ESTE COMPONENTE - en otro useEffect que dependa de si tenemos info del localUser - CREAMOS UNA FUNCION PARA FILTRAR Y MANDAR AL COMPONENTE CARD LOS USUARIOS QUE COINCIDAN CON EL genderInt DEL LOCALUSER('female' o 'male')
  }, [isAuthenticated]);

  return (
    <>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      {isAuthenticated && usersSelected.length > 0 ? (
        <Box>
          <Header />
          <TemporaryDrawer />
          <Card usersSelected={usersSelected}></Card>
          
          <Detail />
         
        </Box>
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
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <Typography variant="h4">
                    ! Encuentra el Amor en Henry ! Matchea y chateá con Alumnos
                    de Henry
                  </Typography>
                  <LoginButton />
                  <Copyright sx={{ mt: 30 }} />
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
