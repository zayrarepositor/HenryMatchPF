import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo.png";

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

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      {isLoading && <Loader></Loader>}
      {isAuthenticated && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton>
                <MenuIcon />
              </IconButton>
              {/* LOGO */}
              <img className="logo" src={logo} alt="logo" />
              {/* DESKTOP */}
              <NavLink to="/desktop">
                <IconButton>
                  <WorkHistoryIcon fontSize="large" />
                </IconButton>
              </NavLink>
              {/* MESSAGES */}
              <NavLink to="/chatroom">
                <IconButton>
                  <ForumIcon fontSize="large" />
                </IconButton>
              </NavLink>
              {/* SETTINGS */}
              <NavLink to="/profile">
                <IconButton>
                  <SettingsIcon fontSize="large" />
                </IconButton>
              </NavLink>
              {/* PROFILE */}
              <NavLink to="/profile">
                <IconButton>
                  <Avatar
                    src={user.picture}
                    alt={user.name}
                    sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
                </IconButton>
              </NavLink>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  );
};

export default Header;
