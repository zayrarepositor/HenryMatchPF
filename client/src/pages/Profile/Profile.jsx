//======PAQUETES Y LIBRERIAS
import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

//======IMPORTACIONES DE COMPONENTES
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import LoginButton from "../../components/LoginButton/LoginButton";
import Loader from "../../components/Loader/Loader";
import Formu from "../../components/Form/Form";
import Invitation2 from "../../components/Reviews/Invitation2";

import ReviewField from "../../components/Reviews/ReviewField";

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { /* getUsers, */ getUserByNick, updateUser } from "../../Redux/actions";

//======ESTILO E IMAGENES
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userDetail);
  const { user, isAuthenticated, isLoading } = useAuth0();
  // ACTUALIZAR AL RENDERIZAR
  const [update, setUpdate] = useState(false);
  //RENDERIZAR EL FORM
  const [updateForm, setUpdateForm] = useState(false);

  useEffect(() => {
    dispatch(getUserByNick(userProfile?.nickname));
    setUpdate(false);
  }, [update]);

  //ACTUALIZO CAMBIOS
  const handleClick = () => {
    setUpdateForm(true);
  };

  // BOTON PARA ELIMINAR CUENTA :
  function handleUserActive() {
    dispatch(updateUser(userProfile._id, { active: false }));
    /*   setUpdate(true);
      setUpdateForm(false) */
    alert("Tu cuenta ha sido eliminada");
  }

  return (
    <>
      {isLoading && <Loader />}
      {isAuthenticated ? (
        <div className="todojunto">
          {/* MENSAJITO SI EL USUARIO NO HA DEJADO SU COMENTARIO AUN */}
          <Invitation2 userDetail={userProfile} />
          <ReviewField userDetail={userProfile} />
          <div className="informaciondelusuario">
            <Link to="/">
              <button className="returnHomeButton">Return to Home</button>
            </Link>
            <Avatar
              src={userProfile?.image}
              alt={userProfile?.name}
              sx={{ width: 56, height: 56 }}
              align="center"></Avatar>

            <Typography variant="h2" color="text.secondary">
              {userProfile?.name}
            </Typography>
            {/*  <h1 className="perfil">Perfil del Usuario</h1> */}
            <div className="label">
              {userProfile?.name ? (
                <p>El nombre que elegiste para mostrar: {userProfile?.name} </p>
              ) : (
                <p> Todavia no ingresaste un nombre para mostrar</p>
              )}
            </div>

            <div className="label">
              {userProfile?.image ? (
                /* .length >= 0 ? */ <img
                  src={userProfile?.image}
                  alt={userProfile?.name}
                  className="imagenperfil"
                />
              ) : (
                <p className="alert"> Debes cargar una imagen </p>
              )}
            </div>

            <div className="label">
              {userProfile?.age ? (
                <p> La edad que declaraste es: {userProfile?.age} </p>
              ) : (
                <p className="alert"> Todavia no ingresaste tu edad</p>
              )}
            </div>

            <div className="label">
              {userProfile?.city ? (
                <p> Tu ciudad es: {userProfile?.city} </p>
              ) : (
                <p className="alert"> Todavia no ingresaste tu ciudad</p>
              )}
            </div>

            <div className="label">
              {userProfile?.email ? (
                <p> Tu email: {userProfile?.email} </p>
              ) : (
                <p className="alert"> Todavia no ingresaste tu email</p>
              )}
            </div>

            <div className="label">
              {userProfile?.gender ? (
                <p>
                  Te definiste como{" "}
                  {userProfile?.gender === "male" ? (
                    <p>"hombre"</p>
                  ) : (
                    <p>"mujer"</p>
                  )}
                </p>
              ) : (
                <p className="alert"> Todavia no definiste tu género</p>
              )}
            </div>

            <div className="label">
              {userProfile?.genderInt ? (
                <p>
                  Te interesa conectar con
                  {userProfile?.genderInt === "male" ? (
                    <p>"hombres"</p>
                  ) : userProfile?.genderInt === "female" ? (
                    <p>"mujeres"</p>
                  ) : (
                    <p>"ambos"</p>
                  )}
                </p>
              ) : (
                <p className="alert">
                  {" "}
                  Todavia no definiste tu genero de interes{" "}
                </p>
              )}{" "}
            </div>

            <div className="label">
              {userProfile?.description ? (
                <p> Tu Descripcion: {userProfile?.description} </p>
              ) : (
                <p className="alert"> Ingresa una breve descripcion tuya</p>
              )}
            </div>

            <div className="label">
              {userProfile?.interests ? (
                <div>
                  <p> Tus Intereses son: </p>
                  {userProfile?.interests.map((i, index) => (
                    <p key={index}>{i}</p>
                  ))}
                </div>
              ) : (
                <p className="alert"> Ingresa tus intereses</p>
              )}
            </div>

            <div className="label">
              {userProfile?.henryLevel ? (
                <p> Etapa del Bootcamp: {userProfile?.henryLevel} </p>
              ) : (
                <p className="alert"> Ingresa tu etapa de Bootcamp</p>
              )}
            </div>
            <button className="eliminar" onClick={handleUserActive}>
              ELIMINAR CUENTA
            </button>
            <LogoutButton />
          </div>
          <button onClick={handleClick}> Actualiza tus Datos </button>
          {updateForm && (
            <div className="datosacompletar">
              <Formu setUpdate={setUpdate} setUpdateForm={setUpdateForm} />
            </div>
          )}
        </div>
      ) : (
        <Paper>
          <Box
            sx={{
              boxShadow: 25,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Typography
              component="legend"
              variant="h4"
              sx={{
                mb: 3,
              }}>
              Lo siento, pero no estas loggeado
            </Typography>

            <NavLink to="/">
              <Button
                color="primary"
                type="button"
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                HOME{" "}
              </Button>
            </NavLink>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default Profile;
