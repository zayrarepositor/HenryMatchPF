import React from "react";
import MyNetwork from "../../components/Chat/MyNetwork";
import { useSelector } from "react-redux";

const ChatRoom = () => {
  const userDetail = useSelector(state => state.userDetail)
  const userMatches = useSelector(state => state.userMatches)
  const users = useSelector(state => state.users)

  console.log(userMatches,"matchesChatromm")
  return <div>
     <MyNetwork
        usersDetail={userDetail}
        users={users}
        userMatches={userMatches}
        />
  </div>;
  
};

export default ChatRoom;
