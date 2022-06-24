import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      {isLoading && <Loader></Loader>}
      {isAuthenticated ? (
        <>
          <h1>Tu Profile, usuario loggeado</h1>
          <p>
            FOTOS: añadir archivos,SOBRE(user.name): 500 caracteres,INTERESES:
            musica, cine, dibujo, videojuegos, juegos de mesa, juegos de
            estrategia, netflix, baile,manualidades, pintura, lectura, ESTILO DE
            VIDA: signo zodiacal/mascotas/tabaco/cargo/empresa/formacion/vivo
            en/genero/mostrar mi edad/mostrar mi distancia
          </p>
          <LogoutButton />
        </>
      ) : (
        <h1>es el profile pero no estas loggeado</h1>
      )}
    </>
  );
};

export default Profile;
