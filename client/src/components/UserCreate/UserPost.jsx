import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../Redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";

const UserPost = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const userNick = useSelector((state) => state.state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: user?.name ? user?.name : "ExampleName",
    age: "",
    birthday: "",
    nickname: user?.sub,
    email: user?.email ? user?.email : "EmailExample@gmail.com",
    image: user?.picture,
    gender: "",
    genderInt: "",
    description: "",
    password: "null",
    likeGiven: [],
    likeRecieved: [],
  });

  console.log(user, "from post");
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createUser(input));
    alert("post", user.sub);
  }

  return (
    <div>
      <h2>Esto es el boton para el modal de bienvenida/post</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <hr></hr>
        <label>"me identifico como..."</label>
        <select name="gender" onChange={handleChange} required>
          <option value={"male"}>hombre</option>
          <option value={"female"}>mujer</option>
        </select>
        <hr></hr>
        <label>"prefiero encontrarme con..."</label>
        <select
          name="genderInt"
          placeholder="me interesa..."
          onChange={handleChange}
          value={user.gender}
          required>
          <option value={"male"}>hombres</option>
          <option value={"female"}>mujers</option>
          <option value={"both"}>ambos</option>
        </select>
        <hr></hr>
        <button type="submit">aceptar</button>
      </form>
    </div>
  );
};

export default UserPost;
