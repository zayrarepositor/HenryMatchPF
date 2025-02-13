//======PAQUETES Y LIBRERIAS
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

//======IMPORTACIONES DE COMPONENTES

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import {
  createUser,
  getUserByNick,
  filterByGender,
  filterByMe,
} from "../../Redux/actions/index";
import setterName from "./helpers.jsx";

//======ESTILO E IMAGENES
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import Swal from "sweetalert2";
import { Typography } from "@mui/material";
import { fontSize } from "@mui/system";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Box } from "@mui/material";

//FORMULARIO INICIAL
const initialForm = {
  name: "",
  age: "",
  nickname: "",
  email: "",
  premium: false,
  isAdmin: false,
  active: true,
  role: "default",
  image: "",
  gender: "",
  genderInt: "",
  description: "",
  dislikeReceived: [],
  likeRecieved: [],
  likeGiven: [],
  dislike: [],
  matches: [],
  interests: [],
  city: "",
  review: "",
  rating: 0,
};

const Modal = ({ modal, setModal, setNewUser }) => {
  //ESTOS ESTADOS VIENEN DE MUI Y SE PASAN COMO PROPS A Dialog.
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  //ESTO ES NUESTRO
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [userForm, setUserForm] = useState(initialForm);
  //PARA RENDERIZAR ALGUN ERROR DE LA VALIDACION
  const [errors, setErrors] = useState({});
  //INPUT NAME
  const [nameInput, setNameInput] = useState("");
  //CHECK
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setUserForm({
      ...userForm,
      nickname: user?.sub,
      email: user?.email,
      image: user?.picture,
    });
  }, [user]);

  //PARA CERRAR MODAL
  const handleClose = () => {
    setModal(false);
  };

  //OBTENGO NOMBRE USUARIO PARA CREAR EL USUARIO
  function handleChangeName(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  }

  //OBTENGO  LA EDAD DEL USUARIO
  function handleChangeAge(e) {
    e.preventDefault();
    const { name, value } = e.target;
    if (value < 18 || value > 90) {
      setErrors({ ...errors, age: "No tenés edad para estar por aquí" });
    } else {
      setUserForm({
        ...userForm,
        [name]: Number(value),
      });
      delete errors.age;
    }
  }
  //OBTENGO LOS DEMAS DATOS DEL USUARIO PARA CREAR EL USUARIO
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  }
  //CHECK
  function handleCheck() {
    check === false ? setCheck(true) : setCheck(false);
  }

  //CREO UN USUARIO NUEVO
  function handleSubmit(e) {
    e.preventDefault();

    //VALIDACIÓN
    const { gender, genderInt, name, age } = userForm;
    if ([gender, genderInt, name, age].includes("")) {
      setErrors({ ...errors, msg: "todos los campos son requeridos" });
      setTimeout(() => {
        setErrors(errors.age ? { age: "No tenés edad para estar aquí" } : {});
      }, 2000);
      return;
    }
    if (Object.keys(errors).length === 0) {
      dispatch(createUser(userForm));

      dispatch(filterByMe());
      //ALERT
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Happy Matching!!",
        showConfirmButton: false,
        timer: 2500,
      });
      //SETEO EL FORMULARIO AL ESTADO ORIGINAL
      setUserForm(initialForm);
      //CIERRO MODAL
      handleClose();
      //IDENTIFICO NUEVO USUARIO
      setNewUser(true);
    }
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth} //ESTADO DEFINIDO ARRIBA
        maxWidth={maxWidth} //ESTADO DEFINIDO ARRIBA
        open={modal}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}>
        <Box textAlign="center" alignItems="center" alignContent="center">
          <DialogTitle>HENRY MATCH - CREAR USUARIO</DialogTitle>
          <LocalFireDepartmentIcon
            color="primary"
            fontSize="large"></LocalFireDepartmentIcon>
          <DialogContent>
            <DialogContentText>
              Contá más sobre vos a la comunidad Henry
            </DialogContentText>
          </DialogContent>
        </Box>

        <DialogContent>
          <form onSubmit={handleSubmit}>
            {/* EL NOMBRE DEL USUARIO */}
            <div>
              <InputLabel htmlFor="name">tu nombre:</InputLabel>
              <input
                type="text"
                name="name"
                placeholder="nombre..."
                onChange={handleChangeName}></input>
            </div>

            {/* LA FECHA DE NACIMIENTO DEL USUARIO */}
            <div>
              <InputLabel htmlFor="age">tu edad:</InputLabel>
              <input
                type="number"
                name="age"
                onChange={handleChangeAge}></input>
              {/* #f94242 */}
              {errors.age && (
                <Typography color="secondary">{errors.age}</Typography>
              )}
            </div>
            {/* EL GENERO DEL USUARIO */}
            <div>
              <InputLabel htmlFor="gender">eres (género):</InputLabel>
              <select name="gender" onChange={handleChange} required>
                <option disabled selected>
                  SELECCIONAR
                </option>
                <option value="male">HOMBRE</option>
                <option value="female">MUJER</option>
              </select>
            </div>
            {/* EL GENERO QUE LE INTERESA VER AL USUARIO */}
            <div>
              <InputLabel htmlFor="genderInt">
                y te interesa encontrar:
              </InputLabel>
              <select name="genderInt" onChange={handleChange} required>
                <option disabled selected>
                  SELECCIONAR
                </option>
                <option value="both">AMBOS</option>
                <option value="male">HOMBRES</option>
                <option value="female">MUJERES</option>
              </select>
            </div>
            {errors.msg && (
              <Typography color="secondary">{errors.msg}</Typography>
            )}
            {/* TERMINOS Y CONDICIONES */}
            <div className="terms">
              <InputLabel htmlFor="terms" sx={{ textDecoration: "none" }}>
                <input type="checkbox" id="terms" onClick={handleCheck} />
                Acepto los{" "}
                <NavLink
                  style={{
                    color: "white",
                  }}
                  to="/terms"
                  target="_blank"
                  rel="noopener noreferrer">
                  términos y condiciones
                </NavLink>
              </InputLabel>
            </div>

            <DialogActions>
              <button type="submit" id="send" disabled={!check}>
                LISTO, QUE TE DIVIERTAS!
              </button>
            </DialogActions>
          </form>
          <p>En tu perfil podras agregar fotos y más información sobre vos</p>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Modal;
