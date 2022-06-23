import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import { UIProvider } from './components/Context/ContextUI'

export const App = () => {
  return (
    <UIProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </UIProvider>
  );
};
