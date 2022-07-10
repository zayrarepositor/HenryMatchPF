//======PAQUETES Y LIBRERIAS
import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

//======IMPORTACIONES DE COMPONENTES
import LoginButton from "../LoginButton/LoginButton";
import Header from "../Header/Header";
import Cards from "../Card";
import Loader from "../Loader/Loader";
//import Detail from "../../components/Detail/Detail";
import BottomBar from "../BottomBar";
import Copyright from "../Copyright/Copyright";
// import MyNetwork from "../../components/Chat/MyNetwork";
// import ChatRoom from "../ChatRoom/ChatRoom";

//======IMPORTACIONES DE FUNCIONES NUESTRAS
import { updateUser } from "../../Redux/actions";

//======ESTILO E IMAGENES
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { IconButton, Box, Stack, Rating, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Swal from "@sweetalert2/themes/dark";
import { shadows } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
//==================
import { Link, Grid, Avatar, CardMedia } from "@mui/material";
import HenryGirl from "../../assets/HenryGirl.jpg";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Modal from "../Modal/Modal";
import SwipeableEdgeDrawer from "../ChatBox/ChatBox";
import MyNetwork from "../Chat/MyNetwork";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const ReviewField = () => {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);

  //VALORACION
  const [rating, setRating] = useState(2);
  const [hover, setHover] = useState();
  const [review, setReview] = useState("");

  const handleMouseOver = (value) => {};
  const handleMouseLeave = (value) => {};

  const handleRating = (e) => {
    e.preventDefault();
    setRating(e.target.value);
  };

  function handleReview(e) {
    e.preventDefault();
    setReview(e.target.value);
  }
  /* { ...review, [e.target.name]: e.target.value,   } */
  function handleSend(e) {
    e.preventDefault();
    dispatch(updateUser(userDetail._id, { rating, review }));
    //ALERT
    Swal.fire({
      title: "Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Enviar",
      denyButtonText: "No enviar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Review enviada!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Review Cancelada", "", "info");
      }
    });

    setReview("");
    setRating(2);
  }
  return (
    <>
      <Box
        elevation={5}
        className="reviews"
        sx={{
          p: 2,
          border: "1px dashed grey",
          px: 2,
          py: 2,
          /*  width: 200,background: "linear-gradient(#060606f3, #060606a2 )" */ boxShadow: 25,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography component="legend" /* variant="h6" */>
          Que te parece Henry Match?
        </Typography>
        <Rating
          name="rating"
          defaultValue={2}
          precision={0.5}
          size="large"
          value={rating}
          getLabelText={getLabelText}
          onChange={handleRating}
          onChangeActive={(e, newHover) => {
            setHover(newHover);
          }}
          /* icon={} readOnly*/
          emptyIcon={
            <StarBorderPurple500Icon
              style={{ opacity: 0.55 }}
              fontSize="inherit"
            />
          }
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}

        <form>
          <label> Dejanos tu comentario: </label>
          <textarea
            onChange={handleReview}
            type="text"
            value={review}
            name="review"
          />
          <button name="review" /* onClick={handleSend} */>Modificar</button>
        </form>
      </Box>

      {/* 
TEXT AREA
<TextField
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
        />

export default function MinHeightTextarea() {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      placeholder="Minimum 3 rows"
      style={{ width: 200 }}
    />
  );
}

<Button
      color="info"
      type="button"
      size="large"
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={() => loginWithRedirect()}
    >
      INGRESAR
    </Button>
 */}
    </>
  );
};

export default ReviewField;
