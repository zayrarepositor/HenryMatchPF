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

const Profile = () => {
  const userProfile = useSelector((state) => state.userDetail);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [update, setUpdate] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserByNick(userProfile.nickname));
    setUpdate(false)
    }, [update]);
  // console.log(user)
  // const itemData = [
  //   {
  //     img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  //     title: "Breakfast",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
  //     title: "Burger",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
  //     title: "Camera",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
  //     title: "Coffee",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
  //     title: "Hats",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
  //     title: "Honey",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
  //     title: "Basketball",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
  //     title: "Fern",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
  //     title: "Mushrooms",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
  //     title: "Tomato basil",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
  //     title: "Sea star",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  //     title: "Bike",
  //   },
  // ];

  return (
    <>
      {isLoading && <Loader />}
      {isAuthenticated ? (
        <>
          <div>
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
                <div>{userProfile.name}</div> 

                <img src={userProfile.image} alt={userProfile.name} />
                <div>{userProfile.age}</div>
                <div>{userProfile.email}</div>
                <div>{userProfile.genderInt}</div>
                <div>{userProfile.gender}</div>
                <div>{userProfile.description}</div>

          </div>
          {/* <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            <img src={userProfile.image} alt={userProfile.name} />
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))} 
           </ImageList> */}
          <div>
            <h1> DATOS A COMPLETAR</h1>
            <Formu setUpdate={setUpdate}/>
            <LogoutButton />
          </div>
        </>
      ) : (
        <h1>es el profile pero no estas loggeado</h1>
      )}
    </>
  );
};

export default Profile;
