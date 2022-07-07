import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterUserByMatches, getUserByNick, getUsers } from "../../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import MyNetwork from "../../components/Chat/MyNetwork";
// import NewChat from "../../components/Chat/NewChat";
// import Messaging from "../../components/Chat/Messaging";
import PerfilChat from "../../components/Chat/PerfilChat";

const ChatRoom = () => {
  const userDetail = useSelector(state => state.userDetail)
  const userMatches = useSelector(state => state.userMatches)
  const users = useSelector(state => state.users)
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  
  useEffect(() => {
    if(user){
      dispatch(getUserByNick(user.sub)).then(()=> dispatch(filterUserByMatches(userDetail?._id))) 
    }

     
    }, [user, userDetail?._id]);
  
  return (
    <div>
      <div>
        <MyNetwork
            userDetail={userDetail}
            users={users}
            userMatches={userMatches}
        />
      </div>
      <div>
        <PerfilChat
            userDetail={userDetail}
            users={users}
            userMatches={userMatches}
        />
      </div>
      {/* <div>
        <Messaging
            userDetail={userDetail}
            users={users}
            userMatches={userMatches}
        />
      </div> */}
    </div>
  )
  
};

export default ChatRoom;
