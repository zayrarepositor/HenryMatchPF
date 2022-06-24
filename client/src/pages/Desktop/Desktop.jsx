import React from "react";
import { NavLink } from "react-router-dom";
import screenshot from "./screenshot.png";

//MODIFICAR LA HARCODEADA DE IMG

const Desktop = () => {
  return (
    <NavLink to={"/"}>
      <img
        src={screenshot}
        alt="img not found"
        width={"100%"}
        height={"100%"}
      />
    </NavLink>
  );
};

export default Desktop;
