import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../Redux/actions/index/index";
import { useAuth0 } from "@auth0/auth0-react";

const UserPost = ({ gender, setGender }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const userNick = useSelector((state) => state.state);
  const dispatch = useDispatch();

  const [userForm, setUserForm] = useState({
    name: user?.name || "ExampleName",
    age: "",
    birthday: "",
    nickname: user?.sub,
    email: user?.email || "EmailExample@gmail.com",
    image: user?.picture,
    gender: "",
    genderInt: "",
    description: "",
    password: "null",
    likeGiven: [],
    likeRecieved: [],
  });

  //OBTENGO EL GENERO DE INTERES DEL USUARIO Y SETEO EL ESTADO (gender) DEL HOME QUE SE USARA PARA FILTRAR EL GENERO QUE RENDERIZO
  function handleGenderIntChange(e) {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });

    setGender(value);
  }

  //OBTENGO EL GENERO DEL USUARIO
  function handleGenderChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  }

  //CREO UN USUARIO NUEVO
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createUser(userForm));
    alert("post", user.sub);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>te interesa encontrar:</h3>

        <select name="genderInt" onChange={handleGenderIntChange}>
          <option value="both">both</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>

        <h3>y vos eres (genero):</h3>

        <select name="gender" onChange={handleGenderChange} required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit">POSTEAR</button>
      </form>
    </div>
  );
};

export default UserPost;
