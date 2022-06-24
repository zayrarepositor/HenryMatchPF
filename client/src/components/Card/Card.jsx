import "../Card/Card.css";
import CardUser from "react-tinder-card";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton } from "@mui/material";
import { useUIContext } from "../Context/ContextUI";

const Card = ({ usersSelected }) => {
  const { setshowDetailBox } = useUIContext();

  return (
    <div>
      <div className="tarjetasTinder">
        <div className="tarjetasTinder__contenedor">
          {usersSelected?.map((user) => (
            <CardUser
              className="swipe"
              key={user.name}
              preventSwipe={["up", "down"]}>
              <div
                className="tarjeta"
                style={{ backgroundImage: `url(${user.image})` }}>
                <h2>{user.name}</h2>
                <IconButton sx={{ left: 555, top: -5 }}>
                  <InfoIcon onClick={() => setshowDetailBox(true)} />
                </IconButton>
              </div>
            </CardUser>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
