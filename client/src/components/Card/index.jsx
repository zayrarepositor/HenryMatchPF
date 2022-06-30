import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CakeIcon from "@mui/icons-material/Cake";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InterestsIcon from '@mui/icons-material/Interests';

import { Box, Divider } from "@mui/material";
import { updateUser } from "../../Redux/actions";
import { useEffect } from "react";
import { getUsers } from './../../Redux/actions/index';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Cards() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //*******/

  const db = useSelector((state) => state.usersSelected);
  const currentUser = useSelector((state)=> state.userDetail)
  const [UpdateCurrentUser, setUpdateCurrentUser] = useState({

  })
  const [UpdateCardUser, setUpdateCardUser] = useState({

  })
 
const dispatch = useDispatch();

useEffect(()=>{
 dispatch(getUsers())
},[UpdateCardUser, UpdateCurrentUser])

  const [currentIndex, setCurrentIndex] = React.useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, name, index, id) => {

    const currentCard = db.find((ss)=> ss._id === id)

    setUpdateCardUser(currentCard)
    setUpdateCurrentUser(currentUser)
    
    const miID = currentUser._id;
    
    const foundMatch = currentCard.likeGiven.includes(miID)
    
    if(foundMatch){
     
      setUpdateCardUser(prevState => {
        return {
          ...prevState,
          matches: [...prevState.matches, miID]
        }
      })
      dispatch(updateUser(id, UpdateCardUser))
      setUpdateCurrentUser(prevState => {
        return {
          ...prevState,
          matches: [...prevState.matches, id]
        }
      })
      dispatch(updateUser(miID, UpdateCurrentUser))

    }

    if(direction === 'right'){
      
   
    setUpdateCardUser(prevState => {
      return {
        ...prevState,
        likeReceived: [...prevState.likeReceived, miID]
      }
    })
    dispatch(updateUser(id, UpdateCardUser))
   setUpdateCurrentUser(prevState => {
    return {
      ...prevState.likeGiven, id
     
    }
   })
   console.log(UpdateCurrentUser)
 
   dispatch(updateUser(miID, UpdateCurrentUser))
   
      console.log(UpdateCardUser);
      console.log(UpdateCurrentUser);
     
    }
  
    if(direction === 'left'){
      //aca voy juntando los dislikes dados
      setUpdateCurrentUser(prevState => {
        return {
          ...prevState,
          dislike: [...prevState.dislike, id]
        }
      })
      dispatch(updateUser(miID, UpdateCurrentUser))
    }

  
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <>
      {db.map((character, index) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            marginTop: 15,
            position: "absolute",
            right: 0,
            left: 0,
            boxShadow: 3,
            border: 0,
          }}>
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            preventSwipe={["up", "down"]}
            key={character.id}
            onSwipe={(dir) => swiped(dir, character.name, index, character._id)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}>
            <Card
              sx={{
                width: 375,
                marginBottom: 14,
                borderColor: "none",
              }}>
              <CardMedia
                component="img"
                height="566"
                style={{ backgroundImage: "url(" + character.image + ")" }}
                alt=""
                sx={{ borderColor: "#000" }}
              />
              <CardActions disableSpacing sx={{ bgcolor: "inherit" }}>
                <Typography
                  sx={{
                    fontSize: 30,
                    fontWeight: 900,
                    // letterSpacing: 1,
                    fontFamily: "Proxima Nova",
                  }}>
                  {character.name}{" "}
                  <Typography
                    sx={{
                      fontWeight: 300,
                      display: "inline",
                      fontSize: 20,
                      letterSpacing: 2,
                      fontFamily: "Proxima Nova",
                    }}>
                    {character.age}
                  </Typography>
                </Typography>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more">
                  <ExpandMoreIcon color="light" />
                </ExpandMore>
              </CardActions>

              <Collapse
                in={expanded}
                timeout="auto"
                unmountOnExit
                sx={{
                  marginTop: -3,
                }}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      right: 0,
                      left: 0,
                      marginTop: 1,
                    }}>
                    <Typography>
                      <LocationOnIcon /> {character.city}
                    </Typography>
                  </Box>
                  <Typography sx={{ letterSpacing: 3, fontStyle: "oblique" }}>
                    {character.description}
                  </Typography>
                  <Divider color="#ffff00" />
                  <Typography textTransform="uppercase">
                    <PersonOutlineIcon /> {character.gender}
                  </Typography>
                  <Typography>
                    <CakeIcon /> {character.birthday}
                  </Typography>
                  <Divider color="#ffff00" />
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      right: 0,
                      left: 0,
                      marginTop: 1,
                    }}>
                    <Typography
                      textTransform="uppercase"
                      sx={{
                        display: "inline",
                        letterSpacing: 2,
                        fontFamily: "Proxima Nova",
                      }}>
                      <WorkIcon /> {character.job}
                    </Typography>
                    <Typography
                      textTransform="uppercase"
                      sx={{
                        display: "inline",
                        letterSpacing: 2,
                        fontFamily: "Proxima Nova",
                      }}>
                      <AttachFileIcon /> {character.henryLevel}
                    </Typography>

                      <InterestsIcon/> {character.interests?.map((i)=>{
                      return <div key={i}>{i}</div>
                       })}
                    
                  </Box>
                </CardContent>
              </Collapse>
            </Card>
          </TinderCard>
        </Box>
      ))}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "absolute",
          // display: "block",
          top: 70,
          right: 0,
          left: 0,
        }}>
        <IconButton
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("left")}
          color="light"
          size="large">
          <CloseIcon font="large" />
        </IconButton>
        <IconButton
          style={{ backgroundColor: !canGoBack }}
          onClick={() => goBack()}
          color="light"
          size="large">
          <ArrowBackIcon font="large" />
        </IconButton>
        <IconButton
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("right")}
          color="light"
          size="large">
          <FavoriteIcon font="large" />
        </IconButton>
      </Box>
      {lastDirection ? (
        <Typography variant="h5" key={lastDirection}>
          You swiped {lastDirection}
        </Typography>
      ) : (
        <Typography variant="h5">
          Swipe a card or press a button to get Restore Card button visible!
        </Typography>
      )}
    </>
  );
}
