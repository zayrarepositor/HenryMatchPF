import React from 'react'
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {updateUser} from "../../Redux/actions/index/index";
import { useAuth0 } from "@auth0/auth0-react";


function UpdateUser(){
const { user, isAuthenticated, isLoading } = useAuth0();
const navigate = useNavigate();
const [input, setInput] = useState({
    name:"",
    age: "",
    birthday: "",
    nickname: "",
    email: "",
    image: "",
    gender: "",
    genderInt: "",
    description: "",
    henryLevel: ""
})
function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
}
function handleSubmit(e){
    e.preventDefault();
    dispatch(updateUser(id, input))
    setInput({
        name:"",
        age: "",
        birthday: "",
        nickname: "",
        email: "",
        image: "",
        gender: "",
        genderInt: "",
        description: "",
        henryLevel: ""
    })
    navigate("/");
}


  return (
    <div>
                <label></label>
                <input
                type="text"
                value={input.name}
                name="speed"
                placeholder="Speed Points"
                onChange={(e) => handleChange(e)}
                />
               
    </div>
  )
}

export default UpdateUser