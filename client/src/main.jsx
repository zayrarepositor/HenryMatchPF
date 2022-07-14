import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "@mui/system";
//import reportWebVitals from "./reportWebVitals";?????(ZAYRA)
import { Provider } from "react-redux";
import { store } from "./Redux/store";
/* PARA LOS COLORES => import { green, purple } from "@mui/material/colors"; (ZAYRA)*/
import { theme } from "./theme";
import { App } from "./App";
/* import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
//ss
axios.defaults.baseURL =  process.env.REACT_APP_API || "http://localhost:9000"; */

const baseUrl = process.env.REACT_APP_API || "http://localhost:9000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="dev-83yzfxae.us.auth0.com"
        clientId="9mlZRiov0RPOd4jMVCgu52HjlumqbRqE"
        redirectUri={window.location.origin}>
        {/*         http://localhost:3000/home */}
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);
