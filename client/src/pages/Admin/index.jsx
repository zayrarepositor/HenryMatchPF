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
import AdminNavBar from "../../components/Admin/AdminNavBar";
import AdminBottomBar from "../../components/Admin/AdminBottomBar";
import AdminUsers from "../../components/Admin/AdminUsers";
import AdminSideBar from "../../components/Admin/AdminSideBar";

//PABLO CUANDO PUEDAS CONTAME DE ESTA FUNCION <`*.*´> (ZAYRA)

const Admin = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const userMatch = useSelector((state) => state.userMatch);
  const users = useSelector((state) => state.users);
  const userDetail = useSelector((state) => state.userDetail);

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

  return (
    <>
      {isLoading && <Loader />}
      <Grid>
        <CssBaseline />
        <AdminNavBar />
        <AdminUsers />
        <AdminBottomBar />
      </Grid>
    </>
  );
};

export default Admin;
