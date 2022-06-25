//======PAQUETES Y LIBRERIAS
import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

//======IMPORTACIONES DE COMPONENTES
import LoginButton from "../../components/LoginButton/LoginButton";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import Detail from "../../components/Detail/Detail";

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { getUsers } from "../../redux/actions";

//======ESTILO E IMAGENES
import { Typography, Link, Box, Grid, Avatar, CardMedia } from "@mui/material";
import HenryGirl from "../../assets/HenryGirl.jpg";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TemporaryDrawer from "./../../components/SideBar/index";

//PABLO CUANDO PUEDAS CONTAME DE ESTA FUNCION <`*.*´> (ZAYRA)
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
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
  }, [isAuthenticated]);

  //RENDERIZADO CONDICIONAL DEL COMPONENTE MODAL CON LO MINIMO PARA CREAR UN USUARIO

  //ANTES DE CREAR EL USUARIO VERIFICO QUE NO LO TENGA YA EN LA BASE DE DATOS (EL UNICO ATRIBUTO QUE SE ME OCURRE ES nickname)

  // FUNCIONALIDAD PARA FILTRAR Y MANDAR AL COMPONENTE CARD LOS USUARIOS QUE COINCIDAN CON EL genderInt DEL USUARIO('hombres mujeres ambos')

  //REVISAR EL RENDERIZADO CONDICIONAL DEL COMPONENTE LOADER

  return (
    <>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      {isAuthenticated && usersSelected.length > 0 ? (
        <Grid>
          <CssBaseline />
          <Header />
          <TemporaryDrawer />

          <Card usersSelected={usersSelected}></Card>
          <Detail />
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
