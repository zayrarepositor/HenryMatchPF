import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PerfilChat from "../../components/Chat/PerfilChat";
import {
  filterUserByMatches,
  getUserByNick,
  getUsers,
} from "../../Redux/actions";

const Notifications = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const userDetail = useSelector((state) => state.userDetail);
  const userMatches = useSelector((state) => state.userMatches);
  const users = useSelector((state) => state.users);
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
    <div>
      <div>
        <PerfilChat
          userDetail={userDetail}
          users={users}
          userMatches={userMatches}
        />
      </div>
    </div>
  );
};

export default Notifications;
