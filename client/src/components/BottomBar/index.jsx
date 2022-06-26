import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import DiamondIcon from "@mui/icons-material/Diamond";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, Tooltip, Typography } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -40,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function BottomBar() {
  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position="fixed" color="inherit" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Tooltip title="PREMIUM">
            <StyledFab
              color="info"
              aria-label="add"
              sx={{ width: 80, height: 80 }}
            >
              <DiamondIcon fontSize="large" />
            </StyledFab>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" color="text.secondary">
            <Link color="inherit" href="#">
              Henry Match
            </Link>{" "}
            {new Date().getFullYear()}
            {". "}
            Hecho con <Favorite fontSize="small" /> por{" "}
            <Link color="inherit" href="#">
              alumnos
            </Link>{" "}
            de Henry
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
