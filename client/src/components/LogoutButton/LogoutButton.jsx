import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      type="button"
      size="medium"
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={() => logout({ returnTo: window.location.origin })}>
      CERRAR SESION
    </Button>
  );
};

export default LogoutButton;
