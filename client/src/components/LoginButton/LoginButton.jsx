import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
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
  );
};

export default LoginButton;
