import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getUserByNick, updateMatches} from "../../Redux/actions/index";
import { Avatar, IconButton, Typography } from "@mui/material";
const DisplayLikeReceived = () => {
    const [likeRec, setlikeRec] = useState(null);
    const currentUser = useSelector((state) => state.userDetail);
    const db = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const myID = currentUser?._id
    
    const likesUserIds = currentUser?.likeReceived.map( (e) => e);
    const likesRec = [... new Set(likesUserIds)];
    //console.log("arrLikesRec",arrLikesRec)
   
    useEffect(
      () => {
        dispatch(getUsers());
      },[ ]);

      const usersReceived = db.filter(
        (e) => e.likeGiven.includes(myID)
      );
      console.log("usersReceived",usersReceived) 

      
      return (
        <div>
          {usersReceived?.map((i) => (
           <div key={i}>
                 <Avatar><img src={i.image}  alt={''} /></Avatar> 
                 <h4>{i.name}</h4>
            </div>
          )
         )}
        </div>
      );
    };
    
    export default DisplayLikeReceived ;