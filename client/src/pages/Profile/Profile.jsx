//======PAQUETES Y LIBRERIAS
import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

//======IMPORTACIONES DE COMPONENTES
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import LoginButton from "../../components/LoginButton/LoginButton";
import Loader from "../../components/Loader/Loader";
import Formu from "../../components/Form/Form";


//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { getUsers, getUserByNick} from "../../Redux/actions";

//======ESTILO E IMAGENES
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Avatar, IconButton, Typography } from "@mui/material";
import './Profile.css';

const Profile = () => {
  const userProfile = useSelector((state) => state.userDetail);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [update, setUpdate] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserByNick(userProfile.nickname));
    setUpdate(false)
    }, [update]);
  
  return (
    <>

      {isLoading && <Loader />}
      {isAuthenticated ? (
        <div className="todojunto">
          <div className="informaciondelusuario">
            <Link to='/'>
              <button >Return to Home</button>
            </Link>
            <Avatar
              src={user.picture}
              alt={user.name}

              sx={{ width: 56, height: 56 }}
              align="center"></Avatar>

            <Typography variant="h2" color="text.secondary">
              {user.name}
            </Typography>
              <h1>INFORMACION DEL USUARIO</h1>
                <div>{userProfile.name? <p> El nombre que elegiste para mostrar: {userProfile.name} </p> : <p> Todavia no ingresaste un nombre para mostrar</p>}</div> 

                <div>{userProfile.image.length >= 0 ? <img src={userProfile.image[0]} alt={userProfile.name} className="imagenperfil"/> : <p className="alert"> Debes cargar una imagen </p> }</div>
                <div>{userProfile.age? <p> La edad que declaraste es: {userProfile.age} </p> : <p className="alert"> Todavia no ingresaste tu edad</p>}</div>
                <div>{userProfile.email ? <p> Tu email: {userProfile.email} </p> : <p className="alert"> Todavia no ingresaste tu email</p>}</div>
                <div>{userProfile.gender ? <p> Te definiste como {userProfile.gender} </p> : <p className="alert"> Todavia no definiste tu género</p>}</div>
                <div>{userProfile.genderInt ? <p> Te interesa conectar con {userProfile.genderInt} </p>  : <p className="alert"> Todavia no definiste tu interes </p>} </div>
                <div>{userProfile.description ? <p> Tu Descripcion: {userProfile.description} </p> : <p className="alert"> Ingresa una breve descripcion tuya</p> }</div>

            <h3> Tus Imagenes cargadas </h3>
            <br />
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {userProfile.image.map((item) => (
              <ImageListItem key={userProfile.image}>
                <img
                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={userProfile.name}
                  loading="lazy"
                  className="imagenescargadas"
                  />
              </ImageListItem>
            ))} 
           </ImageList>
            </div>
          <div className="datosacompletar">
            <h1> DATOS A COMPLETAR</h1>
            <Formu setUpdate={setUpdate}/>
            <LogoutButton />
          </div>
        </div>
      ) : (
        <h1>es el profile pero no estas loggeado</h1>
      )}
    </>
  );
};

export default Profile;
