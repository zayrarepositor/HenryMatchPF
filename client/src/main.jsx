import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "@mui/system";
/* PARA LOS COLORES => import { green, purple } from "@mui/material/colors"; */
import { theme } from "./theme";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-83yzfxae.us.auth0.com"
      clientId="9mlZRiov0RPOd4jMVCgu52HjlumqbRqE"
      redirectUri={window.location.origin}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);
