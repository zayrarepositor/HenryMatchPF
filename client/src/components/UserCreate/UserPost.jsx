import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser, filterUserByGenderInt, getUsersByGender } from "../../Redux/actions/index"
import { useAuth0 } from "@auth0/auth0-react";

const UserPost = ({ gender, setGender }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const userNick = useSelector(state => state.state);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [input, setInput] = useState({

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


  })


  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

  }

  function handleFilterByGenderInt(e) {
    dispatch(filterUserByGenderInt(e.target.value))
  }

  function handleFilterByGender(e) {// revisar el estado en el inspector sale uno que no existe ??
    // dispatch(getUsersByGender(e.target.value))
    setGender(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(createUser(input))
    // navigate("/");
    alert("post", user.sub)
  }

  return (
    <div>




      <h3>genre of Interes</h3>
      <select onChange={e => handleFilterByGender(e)}>
        <option value="both">both</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>

      <h2>Esto es el boton para el modal de bienvenida/post</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h3>genre</h3>
        <select onChange={e => handleChange(e)}>
          <option value="both">Both</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit">aceptar</button>
      </form>

    </div>
  );
};

export default UserPost;
