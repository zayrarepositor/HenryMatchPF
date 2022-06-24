import { useAuth0 } from "@auth0/auth0-react";

import { Typography, Link, Box, Grid, Avatar, CardMedia } from "@mui/material";
import LoginButton from "../../components/LoginButton/LoginButton";
import Header from "../../components/Header/Header";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import ButtonSwipe from "../../components/ButtonSwipe/ButtonSwipe";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import HenryGirl from "../../assets/HenryGirl.jpg";

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
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      {isAuthenticated ? (
        <Box>
          <Header />
          <Card />
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
