import { Stack, CircularProgress } from "@mui/material";

//ELEGIR COLOR DEL LOADER
{
  /* <CircularProgress color="success"||"secondary"||></CircularProgress> */
}

const Loader = () => {
  return (
    <Stack spacing={2}>
      <CircularProgress color="success"></CircularProgress>
    </Stack>
  );
};

export default Loader;
