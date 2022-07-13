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
  Fab,
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
import AddIcon from "@mui/icons-material/Add";

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
        <Box sx={{ paddingLeft: 2 }}>
          <Typography variant="h2">Editar Perfil</Typography>
        </Box>

        <Box sx={{ bgcolor: "black" }}>
          <input
            style={{ background: "black" }}
            className="selectAr"
            type="file"
            ref={fileInput}
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          />
          <Typography sx={{ paddingLeft: 2 }}>Foto de perfil</Typography>
          <Box sx={{ paddingLeft: "90%" }}>
            <IconButton className="cargar" onClick={uploadImage}>
              <AddIcon sx={{ color: "success.main" }} />{" "}
            </IconButton>
          </Box>
        </Box>

        <TextField
          id="outlined-multiline-static"
          label="Tu nombre"
          onChange={handleOnChange}
          value={input.name}
          name="name"
          fullWidth
        />
        <Box sx={{ display: "flex", paddingLeft: "95%" }}>
          <IconButton onClick={handleSend}>
            <CheckIcon sx={{ color: "success.main" }} />
          </IconButton>
        </Box>

        <TextField
          id="outlined-multiline-static"
          label="Tu edad"
          onChange={handleOnChange}
          value={input.age}
          name="age"
          fullWidth
        />
        <Box sx={{ display: "flex", paddingLeft: "95%" }}>
          <IconButton onClick={handleSend}>
            <CheckIcon sx={{ color: "success.main" }} />
          </IconButton>
        </Box>

        <TextField
          id="outlined-multiline-static"
          label="Tu celular"
          onChange={handleOnChange}
          value={input.phone}
          name="phone"
          fullWidth
        />
        <Box sx={{ display: "flex", paddingLeft: "95%" }}>
          <IconButton onClick={handleSend}>
            <CheckIcon sx={{ color: "success.main" }} />
          </IconButton>
        </Box>

        <TextField
          id="outlined-multiline-static"
          label="Tu ciudad"
          onChange={handleOnChange}
          value={input.city}
          name="city"
          fullWidth
        />
        <Box sx={{ display: "flex", paddingLeft: "95%" }}>
          <IconButton onClick={handleSend}>
            <CheckIcon sx={{ color: "success.main" }} />
          </IconButton>
        </Box>

        <FormControl fullWidth>
          <InputLabel id="Tu sexo">Tu sexo</InputLabel>
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

        <FormControl fullWidth>
          <InputLabel id="Me interesan">Me gustan</InputLabel>
          <Select
            labelId="Me interesan"
            onChange={(e) => handleOnChange(e)}
            value={input.genderInt}
            name="genderInt"
            label="Me interesan"
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

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Intereses</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleSelect}
            value={input.interests}
            name="interests"
            label="Intereses"
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

        {/* HENRYLEVEL */}
        <FormControl fullWidth>
          <InputLabel id="Modulo"> Modulo</InputLabel>
          <Select
            id="Tu modulo actual"
            labelId="Modulo"
            label="Intereses"
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
          id="outlined-multiline-static"
          label="Tu descripcion"
          multiline
          rows={3}
          onChange={handleOnChange}
          value={input.description}
          name="description"
          fullWidth
        />
        <Box sx={{ display: "flex", paddingLeft: "95%" }}>
          <IconButton onClick={handleSend}>
            <CheckIcon sx={{ color: "success.main" }} />
          </IconButton>
        </Box>

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

        <Box display="block" sx={{ paddingLeft: "86%" }}>
          <Button
            size="large"
            onClick={closeForm}
            variant="contained"
            color="secondary"
          >
            <Typography sx={{ color: "white" }}>CERRAR</Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Formu;
