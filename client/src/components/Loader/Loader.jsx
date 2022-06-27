//======ESTILO E IMAGENES
import { Stack, CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

//ELEGIR COLOR DEL LOADER
{
  /* <CircularProgress color="success"||"secondary"||></CircularProgress> */
}

const Loader = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}>
      <CircularProgress color="primary"></CircularProgress>
    </Backdrop>
  );
};

export default Loader;
