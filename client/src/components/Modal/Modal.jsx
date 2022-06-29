//======PAQUETES Y LIBRERIAS
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

//======IMPORTACIONES DE COMPONENTES

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { createUser, getUserByNick } from "../../Redux/actions/index";

//======ESTILO E IMAGENES
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import Swal from "sweetalert2";

//FORMULARIO INICIAL
const initialForm = {
  name: "", //*
  age: "",
  birthday: "",
  nickname: "", //*
  email: "", //REQUERIDO EN DB//*
  image: "", //REQUERIDO EN DB//*
  description: "",
  gender: "male",
  genderInt: "both",
  password: null,
  likeGiven: [],
  likeRecieved: [],
};

const Modal = ({ modal, setModal, setGender }) => {
  //ESTOS ESTADOS VIENEN DE MUI Y SE PASAN COMO PROPS A Dialog.
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  //ESTO ES NUESTRO
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [userForm, setUserForm] = useState(initialForm);

  const handleClose = () => {
    setModal(false);
  };

  useEffect(() => {
    setUserForm({
      ...userForm,
      name: user?.name,
      nickname: user?.sub,
      email: user?.email, //REQUERIDO EN DB
      image:
        user?.picture ||
        "https://images.unsplash.com/photo-1610805796066-66f6052e1db2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    });
  }, [user]);

  //OBTENGO EL GENERO DE INTERES DEL USUARIO PARA CREAR EL USUARIO
  function handleGenderIntChange(e) {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
    //SETEO EL ESTADO (gender) DEL HOME QUE SE USARA PARA FILTRAR LAS CARDS QUE RENDERIZARE
    setGender(value);
  }

  //OBTENGO EL GENERO PARA CREAR DEL USUARIO
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
    /*    
    //SI gender O genderInt ESTAN VACÍOS. POR AHORA NUNCA ENTRARA AQUI PUES EL initialForm YA TIENE ESOS CAMPOS LLENOS, PERO DEJO ESTAS LINEAS POR SI EL initialForm SE CAMBIA
    const { gender, genderInt } = userForm;
    if ([gender, genderInt].includes("")) {
      setTimeout(() => {
        alert("todos los campos son requeridos");
      }, 3000);
      return;
    } */
    //AHORA SI CREO UN USUARIO NUEVO
    dispatch(createUser(userForm));

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Happy Matching!!",
      showConfirmButton: false,
      timer: 2500,
    });
    //SETEO EL FORMULARIO AL ESTADO ORIGINAL
    setUserForm(initialForm);
    //ME GUARDO EL SUB (NUESTRO NICKNAME) DEL USUARIO DE AUTH0 EN ESTA VARIABLE
    const localUserNickname = user.sub;
    //GUARDO EL USUARIO LOCAL EN EL USERDETAIL DEL STORE
    getUserByNick(localUserNickname);
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
          {/* ========MARTIN========> CUANDO TRATE DE PASAR EL FORM A MATERIAL UAI NO FUNCIONABA ASI QUE MEJOOOOOOR NO TOQUES LAS ETIQUETAS FORM, SELECT Y EL BOTON, TE DEJO ABAJO COMENTADO ALGO DE LO QUE TRATE DE HACER PARA QUE LO VEAS PERO YO DIRIA QUE ARREGLES LO ESTETICO SIN MODIFICAR LAS ETIQUETAS *U.U* */}
          <form onSubmit={handleSubmit}>
            {/* EL GENERO DEL USUARIO */}
            <InputLabel htmlFor="gender">eres (género):</InputLabel>
            <select name="gender" onChange={handleGenderChange} required>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {/*
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
            </Select> */}
            {/* EL GENERO QUE LE INTERESA VER AL USUARIO */}
            <InputLabel htmlFor="genderInt">
              y te interesa encontrar:
            </InputLabel>
            <select name="genderInt" onChange={handleGenderIntChange} required>
              <option value="both">Both</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <DialogActions>
              {/*  <Button variant="contained" type="submit">
                LISTO, QUE TE DIVIERTAS!
              </Button> */}
              <button type="submit">LISTO, QUE TE DIVIERTAS!</button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Modal;
