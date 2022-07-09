import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  getUserByNick,
  updateMatches,
} from "../../Redux/actions/index";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const DisplayLikeReceived = () => {
  const [likeRec, setlikeRec] = useState(null);
  const currentUser = useSelector((state) => state.userDetail);
  const db = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const myID = currentUser?._id;

  const likesUserIds = currentUser?.likeReceived.map((e) => e);
  const likesRec = [...new Set(likesUserIds)];
  //console.log("arrLikesRec",arrLikesRec)

  // useEffect(
  //   () => {
  //     dispatch(getUsers());
  //   },[ ]);

  const usersReceived = db.filter((e) => e.likeGiven.includes(myID));
  // console.log("usersReceived", usersReceived);

  return (
    <div>
      {usersReceived?.map((user) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={user.name} src={user.image} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={"te ha dado un like!"}
              sx={{ color: "primary.contrastText" }}
            />
            {/* <IconButton color="primary" size="large">
              <SendIcon />
            </IconButton> */}
          </ListItem>

          <Divider variant="inset" component="li" />
        </>
      ))}
    </div>
  );
};

export default DisplayLikeReceived;
