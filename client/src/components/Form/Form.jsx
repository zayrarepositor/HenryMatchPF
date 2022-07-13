//======PAQUETES Y LIBRERIAS
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

//======IMPORTACIONES DE COMPONENTES

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { /* updateImg, */ updateUser } from "../../Redux/actions";

//======ESTILO E IMAGENES
import "./Form.css";
import Swal from "sweetalert2";
import { Box } from "@mui/system";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

//Formik identifica todos los inputs con ese NAME
// renderer prop: renderizamos el formulario dentro de una funcion y por ahi le vamos a pasar props(valores) de Formik
// Como es una funcion le puedo poner props e ingreso poniendo props.handleSubmit o sino {}

const interests = [
  { title: "Viajar" },
  { title: "Leer" },
  { title: "Redes Sociales" },
  { title: "Blogging" },
  { title: "Artes" },
  { title: "Escritura" },
  { title: "Cocina" },
  { title: "Baile" },
  { title: "Deportes" },
  { title: "Musica" },
  { title: "Producción Musical" },
  { title: "Yoga" },
  { title: "Idiomas" },
  { title: "Jardinería" },
  { title: "Manualidades" },
  { title: "Maquillaje" },
  { title: "Aprendizaje" },
  { title: "Naturaleza" },
  { title: "Pintura" },
  { title: "Escritura" },
  { title: "Fotografía" },
  { title: "Javascript" },
  { title: "React" },
  { title: "CSS" },
  { title: "Front End" },
  { title: "Back End" },
  { title: "Node" },
  { title: "Java" },
  { title: "Python" },
  { title: "C/C++" },
  { title: "C#" },
  { title: "Swift" },
  { title: "PHP" },
  { title: "Programacion" },
  { title: "Henry" },
  { title: "Proyecto Final" },
  { title: "Proyecto Individual" },
  { title: "Bootcamp" },
  { title: "Checkpoint" },
  { title: "Henry Challenge" },
  { title: "Henry Staff" },
  { title: "Henry Mentor" },
  { title: "Henry Hero" },
  { title: "Technical Assistant" },
  { title: "Pair Programing" },
  { title: "SUP" },
  { title: "Lecture" },
  { title: "Code Review" },
];

function validate1(input) {
  let errors1 = {};

  if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.name)) {
    errors1.name = "El nombre solo puede contene letras y espacios";
  }
  return errors1;
}
function validate2(input) {
  let errors2 = {};
  if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input.email)) {
    errors2.email =
      "El correo solo puede contene letras, numeros, puntos, guiones y guion bajo.";
  }
  return errors2;
}
function validate3(input) {
  let errors3 = {};
  if (!/[0-9]+/.test(input.age)) {
    errors3.age = "El campo solo admite numeros";
  }
  return errors3;
}
function validate4(input) {
  let errors4 = {};
  if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.city)) {
    errors4.city = "La ciudad solo puede contener letras y espacios";
  }
  return errors4;
}
function validate5(input) {
  let errors5 = {};
  if (!/[0-9]+/.test(input.phone)) {
    errors5.age = "El campo solo admite numeros";
  }
  return errors5;
}
function validate6(input) {
  let errors6 = {};
  return errors6;
}

const Formu = ({ setUpdate, setUpdateForm }) => {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    age: "",
    phone: "",
    gender: "",
    genderInt: "",
    henryLevel: "",
    description: "",
    review: "",
    city: "",
    email: "",
    interests: [],
  });

  const fileInput = useRef();

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "yqu5aezb");
    await axios
      .post("https://api.cloudinary.com/v1_1/henrymatch/image/upload", formData)
      .then((res) => {
        const urlImage = res.data.url;
        dispatch(updateUser(userDetail._id, { image: urlImage }));
        setUpdate(true);
        /* setUpdateForm(false) */
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Datos actualizados con exito",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    fileInput.current.value = null;
  };

  const closeForm = () => {
    setUpdateForm(false);
  };

  function handleOnChange(e) {
    setInput(e.target.value);
    setErrors(
      validate1({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setErrors(
      validate2({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setErrors(
      validate3({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setErrors(
      validate4({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setErrors(
      validate5({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setErrors(
      validate6({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    e.preventDefault();
    setInput({
      ...input,
      interests: [...new Set([...input.interests, e.target.value])],
    });
  }

  function handleDeleteInterests(e) {
    e.preventDefault();
    setInput({
      ...input,
      interests: [...input.interests.filter((i) => i !== e.target.value)],
    });
  }

  function handleSendInterests(e) {
    e.preventDefault();
    dispatch(updateUser(userDetail._id, { [e.target.name]: input.interests }));
    setUpdate(true);
    console.log(input.interests);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Datos actualizados con exito",
      showConfirmButton: false,
      timer: 1500,
    });
    setInput({
      interests: [],
    });
  }

  function handleSend(e) {
    e.preventDefault();
    dispatch(updateUser(userDetail._id, { [e.target.name]: input }));
    /* dispatch(updateUser(userDetail._id,  [e.target.name]: input)); */
    setUpdate(true);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Datos actualizados con exito",
      showConfirmButton: false,
      timer: 1500,
    });
    setInput({
      name: "",
      age: "",
      phone: "",
      description: "",
      review: "",
      city: "",
      email: "",
      interests: [],
    });
  }

  return (
    <>
      <div>
        <div>
          <button onClick={closeForm}>X</button>
          <input
            className="selectAr"
            type="file"
            ref={fileInput}
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          />
          <button className="cargar" onClick={uploadImage}>
            Modificar Imagen
          </button>
        </div>
      </div>

      <form>
        <label> Tu nombre: </label>

        <input
          onChange={handleOnChange}
          type="text"
          value={input.name}
          name="name"
          placeholder="Escribe tu nombre"
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <button name="name" onClick={(e) => handleSend(e)}>
          {" "}
          Modificar{" "}
        </button>
      </form>

      <form>
        {/* EDAD */}
        <label> Tu edad: </label>
        <input
          onChange={handleOnChange}
          value={input.age}
          type="text"
          name="age"
          placeholder="Escribe tu edad"
        />
        {errors.age && <p className="error">{errors.age}</p>}
        <button name="age" onClick={handleSend}>
          {" "}
          Modificar{" "}
        </button>
      </form>

      <form>
        {/* EDAD */}
        <label> Tu numero celular: </label>
        <input
          onChange={handleOnChange}
          value={input.phone}
          type="text"
          name="phone"
          placeholder="Escribe tu numero celular"
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
        <button name="phone" onClick={handleSend}>
          {" "}
          Modificar{" "}
        </button>
      </form>

      <form>
        {/* EMAIL */}
        <label> Tu email: </label>
        <input
          onChange={handleOnChange}
          type="text"
          value={input.email}
          name="email"
          placeholder="Escribe tu email"
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <button name="email" onClick={(e) => handleSend(e)}>
          {" "}
          Modificar{" "}
        </button>
      </form>
      <form>
        {/* GENERO */}
        <label> Tu genero: </label>
        <select onChange={handleOnChange} value={input.gender} name="gender">
          <option>Seleccionar</option>
          <option value={"male"}>Hombre</option>
          <option value={"female"}>Mujer</option>
        </select>
        <button name="gender" onClick={handleSend}>
          {" "}
          Modificar{" "}
        </button>
      </form>
      <form>
        {/* CIUDAD */}
        <label> Ciudad: </label>
        <input
          onChange={handleOnChange}
          type="text"
          value={input.city}
          name="city"
          placeholder="Escribe tu ciudad"
        />
        {errors.city && <p className="error">{errors.city}</p>}
        <button name="city" onClick={(e) => handleSend(e)}>
          Modificar
        </button>
      </form>
      <div>
        <label> Busco encontrarme con: </label>
        <select
          onChange={handleOnChange}
          type="text"
          value={input.genderInt}
          name="genderInt"
        >
          <option disabled>Seleccionar</option>
          <option value="male">Hombre</option>
          <option value="female">Mujeres</option>
          <option value="both">Hombres o Mujeres</option>
        </select>
        <button name="genderInt" onClick={handleSend}>
          Modificar
        </button>
      </div>

      <Box>
        <Autocomplete
          multiple
          limitTags={2}
          id="multiple-limit-tags"
          options={interests}
          getOptionLabel={(option) => option.title}
          defaultValue={[userDetail?.interests]}
          renderInput={(params) => (
            <TextField {...params} label="limitTags" placeholder="Favorites" />
          )}
          sx={{ width: "500px" }}
        />
        <IconButton
          onClick={handleSendInterests}
          color="primary"
          aria-label="delete"
        >
          <DeleteIcon color="primary" />
        </IconButton>
      </Box>
      <div /* className="formsubtitle" */>
        <p> HAS ELEGIDO:</p>
        <ul>
          {input.interests &&
            input.interests.map((i) => (
              <div key={i} className="typeselected">
                <p>{i}</p>
                <button
                  className="delbutton"
                  value={i}
                  onClick={handleDeleteInterests}
                >
                  x
                </button>
              </div>
            ))}
        </ul>
      </div>
      <div>
        {/* HENRYLEVEL */}
        <label> Mi etapa en el Bootcamp de Henry </label>
        <select
          onChange={handleOnChange}
          value={input.henryLevel}
          type="text"
          name="henryLevel"
        >
          <option>Seleccionar</option>
          <option value="m1">M1</option>
          <option value="m2">M2</option>
          <option value="m3">M3</option>
          <option value="m4">M4</option>
          <option value="m5">M5</option>
          <option value="m6">M6</option>
          <option value="pi">PI</option>
          <option value="pf">PF</option>
          <option value="graduate">Graduado</option>
        </select>
        <button name="henryLevel" onClick={handleSend}>
          {" "}
          Modificar{" "}
        </button>
      </div>
      <form>
        <label> Sobre mi: </label>
        <textarea
          onChange={handleOnChange}
          type="text"
          value={input.description}
          name="description"
        />
        <button name="description" onClick={handleSend}>
          {" "}
          Modificar{" "}
        </button>
      </form>

      {/* <form>
        <label> Dejanos tu comentario: </label>
        <textarea
          onChange={handleOnChange}
          type="text"
          value={input.review}
          name="review"
        />
        <button name="review" onClick={handleSend}>
          {" "}
          Modificar{" "}
        </button>
      </form> */}
    </>
  );
};

export default Formu;
