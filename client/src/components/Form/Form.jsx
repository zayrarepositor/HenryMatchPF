//======PAQUETES Y LIBRERIAS

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../redux/actions";
import { useEffect } from "react";
//======IMPORTACIONES DE COMPONENTES
//======IMPORTACIONES DE FUNCIONES NUESTRAS
//======ESTILO E IMAGENES

const user = {
  
  name: "",
  age: 0,
  birthday: "",
  nickname: "", //MODIFICAR. DEBE SER UNICO
  email: "",
  image: "", //REQUERIDO URL
  gender: "",
  genderInt: "",
  description: "",
  henryLevel: "",
  password: "", //REQUERIDA
};

const Form = () => {
  const dispatch = useDispatch();
  const [userForm, setUserForm] = useState(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(userForm));
    console.log(updateUser(userForm),"VER ACTION")
    alert("usuario modificado!");
    //message (STORE) PODRIA TRAER INFO PARA UN COMPONENTE MODAL DE NOTIFICACION PERO ESTA LLEGANDO VACIO =( PODRIAMOS CHEQUEAR LA "res.send" DE MONGO ===> PRIORIDAD BAJA
  };

/*   useEffect(() => {
    setUserForm(user)
    console.log(user, 'USERFORM')
  }, [handleSubmit]) */

  const handleChange = (e) => {
    e.preventDefault();
    /* const { name, value } = e.target; */
    setUserForm({
      ...userForm,
      [e.target.name] : e.target.value
     /*  [name]: value, */
    });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="name"
          placeholder="name..."
          onChange={handleChange}></input>
        <input type="number" name="age" placeholder="age.." onChange={handleChange}></input>
        <input type="date" name="birthday" onChange={handleChange}></input>
        <input
          type="text"
          name="nickname"
          placeholder="nickname"
          onChange={handleChange}></input>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}></input>
        <input
          type="password"
          name="password"
          placeholder="password..."
          onChange={handleChange}></input>
        <input
          type="file"
          name="image"
          placeholder="image..."
          onChange={handleChange}
          required></input>
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
        <hr></hr> <label>"henryLevel..."</label>
        <select name="henryLevel" onChange={handleChange}>
          <option value={"m1"}>M 1</option>
          <option value={"m2"}>M 2</option>
          <option value={"m3"}>M 3</option>
          <option value={"m4"}>M 4</option>
          {/* <option value={"pi"}>PI</option>
            <option value={"pf"}>PF</option> REVISAR EL ATRIBUTO henryLevel DE USUARIO*/}
          <option value={"graduate"}>graduado</option>
        </select>
        <label>sobre mi:</label>{" "}
        <textarea
          name="description"
          placeholder="sobre mi..."
          onChange={handleChange}></textarea>
        <button type="submit">MODIFICAR USUARIO</button>
      </form>
    </div>
  );
};

export default Form;
