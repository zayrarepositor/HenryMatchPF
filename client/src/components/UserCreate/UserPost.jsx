import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {createUser} from "../../Redux/actions/index"
import { useAuth0 } from "@auth0/auth0-react";

const UserPost = () =>{
const { user, isAuthenticated, isLoading } = useAuth0();
const navigate = useNavigate();
const dispatch = useDispatch()


const [input, setInput] = useState({
      
      name:user.name,
      age: "",
      birthday: user.nickname,
      nickname: user.sub,
      email: user.email,
      image: user.picture,
      gender: "",
      genderInt: "",
      description:"",
      password:"123"
     
})

console.log(user,"from post")
function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input)
}
function handleSubmit(e){
    e.preventDefault()
    dispatch(createUser(input))
    // navigate("/");
    alert("post",user.sub)
}

  return (
    <div>
      
       {/* <form onSubmit={(e)=>handleSubmit(e)}> */}

            {/* <h1>post</h1> */}
            {/* <Link to="/"> */}
                {/* <button type="submit">Back</button> */}
            {/* </Link> */}
       {/* </form>  */}
        <h1>post</h1>
       <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label></label>
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  placeholder="Name"
                  onChange={(e) => handleChange(e)}
                /> 
              </div>
              {/* ###################################### */}
              <div>
                <label></label>
                <input
               
                  type="text"
                  value={input.nickname}
                  name="nickname"
                  placeholder="nickname"
                  onChange={(e) => handleChange(e)}
                /> 
              </div>
              {/* ###################################### */}
              {/* <div>
                <label></label>
                <input
               
                  type="text"
                  value={input.email}
                  name="email"
                  placeholder="email"
                  onChange={(e) => handleChange(e)}
                /> 
              </div> */}
              {/* ###################################### */}
              {/* <div>
                <label></label>
                <input
               
                  type="text"
                  value={input.image}
                  name="image"
                  placeholder="image"
                  onChange={(e) => handleChange(e)}
                /> 
              </div> */}
              {/* ###################################### */}
              {/* <div>
                <label></label>
                <input
               
                  type="text"
                  value={input.description}
                  name="description"
                  placeholder="description"
                  onChange={(e) => handleChange(e)}
                /> 
              </div> */}
              {/* ###################################### */}
              {/* <div>
                <label></label>
                <input
               
                  type="text"
                  value={input.password}
                  name="password"
                  placeholder="password"
                  onChange={(e) => handleChange(e)}
                /> 
              </div> */}
              {/* ###################################### */}
              <button type="submit">Back</button>
            </form>
       
    </div>
  )
}

export default UserPost