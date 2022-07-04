import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  palette: {
    text: {
      primary: "#fff",
      secondary: "#E0E0E0",
    },
    background: {
      paper: "#353535",
      default: "#000",
    },
    primary: {
      light: "#fff",
      main: "#ffff00",
      dark: "#000",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    dark: {
      light: "rgba(0, 0, 0, 0.7)",
      main: "#000",
      dark: "#000",
      contrastText: "#000",
    },
    light: {
      light: "#fff",
      main: "#fff",
      dark: "#000",
      contrastText: "#000",
    },
  },
  status: {
    danger: "#ba000d",
  },
});

/*  DOCUMENTACION
    https://mui.com/material-ui/customization/theming/#theme-provider

    VARIABLES   
    .palette
    .typography
    .spacing
    .breakpoints
    .zIndex
    .transitions
    .components
 */
