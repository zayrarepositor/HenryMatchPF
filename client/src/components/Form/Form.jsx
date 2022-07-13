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
import {
  Autocomplete,
  Button,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

//Formik identifica todos los inputs con ese NAME
// renderer prop: renderizamos el formulario dentro de una funcion y por ahi le vamos a pasar props(valores) de Formik
// Como es una funcion le puedo poner props e ingreso poniendo props.handleSubmit o sino {}

const interests = [
  "Viajar",
  "Leer",
  "Redes Sociales",
  "Blogging",
  "Artes",
  "Escritura",
  "Cocina",
  "Baile",
  "Deportes",
  "Musica",
  "Producción Musical",
  "Yoga",
  "Idiomas",
  "Jardinería",
  "Manualidades",
  "Maquillaje",
  "Aprendizaje",
  "Naturaleza",
  "Pintura",
  "Escritura",
  "Fotografía",
  "Javascript",
  "React",
  "CSS",
  "Front End",
  "Back End",
  "Node",
  "Java",
  "Python",
  "C/C++",
  "C#",
  "Swift",
  "PHP",
  "Programacion",
  "Henry",
  "Proyecto Final",
  "Proyecto Individual",
  "Bootcamp",
  "Checkpoint",
  "Henry Challenge",
  "Henry Staff",
  "Henry Mentor",
  "Henry Hero",
  "Technical Assistant",
  "Pair Programing",
  "SUP",
  "Lecture",
  "Code Review",
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
    handleSend();
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
      <Box>
        <div>
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
        <FormControl fullWidth>
          {/* GENERO */}
          <InputLabel id="Tu sexo">Tu sexo:</InputLabel>
          <Select
            labelId="Tu sexo"
            onChange={handleOnChange}
            value={input.gender}
            name="gender"
            label="Tu sexo"
          >
            <MenuItem value={"male"}>Hombre</MenuItem>
            <MenuItem value={"female"}>Mujer</MenuItem>
          </Select>
          <Box sx={{ display: "flex", paddingLeft: "95%" }}>
            <IconButton onClick={handleSend}>
              <CheckIcon sx={{ color: "success.main" }} />
            </IconButton>
          </Box>
        </FormControl>

        <Divider sx={{ bgcolor: "white" }} />
        <Box sx={{ paddingTop: 1 }} />

        <FormControl fullWidth>
          <InputLabel id="Me interesan">Me interesan...</InputLabel>
          <Select
            labelId="Me interesan"
            onChange={(e) => handleOnChange(e)}
            value={input.genderInt}
            name="genderInt"
            label="Me interesan..."
          >
            <MenuItem value={"male"}>Hombres</MenuItem>
            <MenuItem value={"female"}> Mujeres</MenuItem>
            <MenuItem value={"both"}> Ambos</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", paddingLeft: "95%" }}>
          <IconButton onClick={handleSend}>
            <CheckIcon sx={{ color: "success.main" }} />
          </IconButton>
        </Box>

        <Divider sx={{ bgcolor: "white" }} />
        <Box sx={{ paddingTop: 1 }} />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Intereses...</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleSelect}
            value={input.interests}
            name="interests"
            label="Intereses..."
          >
            {interests.map((i) => {
              return (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {input.interests &&
          input.interests.map((i) => (
            <Button color="secondary" value={i} onClick={handleDeleteInterests}>
              {i}
            </Button>
          ))}
        <Box sx={{ display: "flex", paddingLeft: "95%" }}>
          <IconButton onClick={handleSendInterests}>
            <CheckIcon sx={{ color: "success.main" }} />
          </IconButton>
        </Box>

        <Divider sx={{ bgcolor: "white" }} />
        <Box sx={{ paddingTop: 1 }} />

        {/* HENRYLEVEL */}
        <FormControl fullWidth>
          <InputLabel id="Modulo"> Modulo... </InputLabel>
          <Select
            id="Tu modulo actual"
            labelId="Modulo"
            label="Intereses..."
            onChange={handleOnChange}
            value={input.henryLevel}
            name="henryLevel"
          >
            <MenuItem value="m1">M1</MenuItem>
            <MenuItem value="m2">M2</MenuItem>
            <MenuItem value="m3">M3</MenuItem>
            <MenuItem value="m4">M4</MenuItem>
            <MenuItem value="m5">M5</MenuItem>
            <MenuItem value="m6">M6</MenuItem>
            <MenuItem value="pi">PI</MenuItem>
            <MenuItem value="pf">PF</MenuItem>
            <MenuItem value="graduate">Graduado</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", paddingLeft: "95%" }}>
          <IconButton onClick={handleSend}>
            <CheckIcon sx={{ color: "success.main" }} />
          </IconButton>
        </Box>
        <TextField
          id="standard-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          // value={value}
          // onChange={handleChange}
          variant="standard"
        />

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
        <Button onClick={closeForm} variant="contained" color="success">
          Success
        </Button>
      </Box>
    </>
  );
};

export default Formu;
