//======PAQUETES Y LIBRERIAS
import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

//======IMPORTACIONES DE COMPONENTES
import LoginButton from "../../components/LoginButton/LoginButton";
import Header from "../../components/Header/Header";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import ButtonSwipe from "../../components/ButtonSwipe/ButtonSwipe";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { getUsers } from "../../redux/actions";

//======ESTILO E IMAGENES
import { Typography, Link, Box, Grid, Avatar, CardMedia } from "@mui/material";
import HenryGirl from "../../assets/HenryGirl.jpg";

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
          <Card usersSelected={usersSelected}></Card>
          <ButtonSwipe />
        </Box>
      ) : (
        <>
          <LoginButton />
        </>
      )}
    </>
  );
};

export default Home;
