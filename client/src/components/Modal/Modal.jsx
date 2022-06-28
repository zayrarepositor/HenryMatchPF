//======PAQUETES Y LIBRERIAS
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

//======IMPORTACIONES DE COMPONENTES
import UserPost from "../UserCreate/UserPost";

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { createUser } from "../../Redux/actions/index";

//======ESTILO E IMAGENES
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";

const Modal = ({ modal, setModal, setGender }) => {
  //ESTOS ESTADOS VIENEN DE MUI Y SE PASAN COMO PROPS A Dialog
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  //ESTO ES NUESTRO
  const [closeModal, setCloseModal] = useState(false);
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [userForm, setUserForm] = useState({
    name: user?.name || "Visitante desconocido",
    age: "",
    birthday: "",
    nickname: user?.sub,
    email: user?.email || "ingresatumail@mail.com",
    image:
      user?.picture ||
      "https://images.unsplash.com/photo-1610805796066-66f6052e1db2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    gender: "",
    genderInt: "",
    description: "",
    password: "null",
    likeGiven: [],
    likeRecieved: [],
  });

  const handleClose = () => {
    setModal(false);
  };

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
    handleClose();
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
        <DialogTitle>HENRY MATCH</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sólo un par de preguntas antes de mostrarte justo lo que buscas
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            {/* EL GENERO DEL USUARIO */}
            <InputLabel htmlFor="gender">eres (género):</InputLabel>
            <Select
              autoFocus
              required
              value={userForm.gender}
              onChange={handleGenderChange}
              label="gender"
              inputProps={{
                name: "gender",
                id: "gender",
              }}>
              <MenuItem value="male">hombre</MenuItem>
              <MenuItem value="female">mujer</MenuItem>
            </Select>
            {/* EL GENERO QUE LE INTERESA VER AL USUARIO */}
            <InputLabel htmlFor="genderInt">
              y te interesa encontrar:
            </InputLabel>
            <Select
              autoFocus
              required
              value={userForm.genderInt}
              onChange={handleGenderIntChange}
              label="genderInt"
              inputProps={{
                name: "genderInt",
                id: "genderInt",
              }}>
              <MenuItem value="both">ambos</MenuItem>
              <MenuItem value="male">hombres</MenuItem>
              <MenuItem value="female">mujeres</MenuItem>
            </Select>

            <DialogActions>
              <Button variant="contained" type="submit">
                LISTO, QUE TE DIVIERTAS!
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Modal;
