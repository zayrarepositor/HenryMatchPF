import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
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
