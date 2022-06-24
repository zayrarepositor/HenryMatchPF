import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Link, Box, Grid } from "@mui/material";
import LoginButton from "../../components/LoginButton/LoginButton";
import Header from "../../components/Header/Header";
import ButtonSwipe from "../../components/ButtonSwipe/ButtonSwipe";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import HenryGirl from "../../assets/HenryGirl.jpg";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
