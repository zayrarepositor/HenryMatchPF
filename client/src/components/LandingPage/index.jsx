import { CssBaseline, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Copyright from "../Copyright/Copyright";
import HenryGirl from "../../assets/HenryGirl.jpg";
import LoginButton from "../LoginButton/LoginButton";
import Paper from "@mui/material/Paper";

const Landing = () => {
  return (
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

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                Matchea y chateá con Alumnos de Henry!
                {/*    {users[0]?.name} */}
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  right: 0,
                  left: 0,
                  border: 0,
                  marginTop: 20,
                }}
              >
                <LoginButton />
              </Box>
              <Copyright sx={{ mt: 25 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Landing;
