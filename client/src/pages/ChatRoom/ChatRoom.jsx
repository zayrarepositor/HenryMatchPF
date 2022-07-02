import React from "react";
import MyNetwork from "../../components/Chat/MyNetwork";
import { useSelector } from "react-redux";

const ChatRoom = () => {
  const userDetail = useSelector(state => state.userDetail)
  const users = useSelector(state => state.users)
  return <div>
     <MyNetwork
        usersDetail={userDetail}
        users={users}
        />
  </div>;
};

export default ChatRoom;
