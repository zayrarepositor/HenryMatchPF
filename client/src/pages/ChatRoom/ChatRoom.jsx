import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterUserByMatches,
  getUserByNick,
  getUsers,
} from "../../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import Chat from "../../components/Chat";
import { Box } from "@mui/material";
import Ban from "../../components/Ban";
import Landing from "../../components/LandingPage";

const ChatRoom = () => {
  const userDetail = useSelector((state) => state.userDetail);
  const userMatches = useSelector((state) => state.userMatches);
  const users = useSelector((state) => state.users);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const iAmActive = userDetail?.active;

  let allAdmins = [];

  let filterAdmins = users.filter((user) => {
    if (user.isAdmin === true) {
      allAdmins.push(user);
    }
  });

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getUserByNick(user.sub)).then(() =>
        dispatch(filterUserByMatches(userDetail?._id))
      );
    }
  }, [user, userDetail?._id]);

  return (
    <Box>
      {isAuthenticated && iAmActive === false ? (
        <>
          <Ban userDetail={userDetail} users={users} allAdmins={allAdmins} />
        </>
      ) : isAuthenticated && iAmActive === true ? (
        <Chat userDetail={userDetail} users={users} userMatches={userMatches} />
      ) : (
        <Landing />
      )}
    </Box>
  );
};

export default ChatRoom;
