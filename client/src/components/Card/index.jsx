import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { CardContent, Tooltip } from "@mui/material";
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
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InterestsIcon from "@mui/icons-material/Interests";
import Swal from "sweetalert2";

import { Box, Divider, Slide } from "@mui/material";
import { MsgContainer, MsgText } from "../Card/StyleMsg";

import { filterByMe, getUserByNick, updateMatches } from "../../Redux/actions/index";
import { useEffect } from "react";
import { getUsers } from "./../../Redux/actions/index";

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

const messages = [
  "",
  "Por el momento no hay más usuarios!",
  "Por favor regresa más tarde.",
];

export default function Cards({ setPremium }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // MENSAJE CUANDO NO HAY MAS CARTAS
  const containerRef = useRef();
  const [show, setShow] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      // get next message
      setMessageIndex((i) => (i + 1) % messages.length);
    }, 1500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  //*******//

  const db = useSelector((state) => state.usersSelected);

  const userDetail = useSelector((state) => state.userDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const [currentIndex, setCurrentIndex] = React.useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db?.length)
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
    const currentCard = db.find((ss) => ss._id === id);

    dispatch(getUserByNick(userDetail?.nickname));

    const miID = userDetail?._id;
    const cardID = currentCard._id;

    if (direction === "right") {
      dispatch(
        updateMatches(id, {
          likeReceived: miID,
        })
      );

      dispatch(
        updateMatches(miID, {
          likeGiven: cardID,
        })
      );

      dispatch(getUserByNick(userDetail?.nickname));
      dispatch(filterByMe());
    }

    if (direction === "left") {
      dispatch(
        updateMatches(miID, {
          dislike: id,
        })
      );

      dispatch(
        updateMatches(id, {
          dislikeReceived: miID,
        })
      );

      dispatch(getUserByNick(userDetail?.nickname));
      //dispatch(filterByMe());
    }

    const foundMatch = currentCard.likeGiven?.includes(miID);

    if (foundMatch) {
      dispatch(
        updateMatches(id, {
          matches: miID,
        })
      );
      Swal.fire({
        title: `hiciste match con ${name}`,
        text: "Felicidades!!",
        imageUrl: `${currentCard.image}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
      dispatch(
        updateMatches(miID, {
          matches: id,
        })
      );
      
      dispatch(getUserByNick(userDetail?.nickname));
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
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  const goBackPremium = async () => {
    setPremium(true);
  };

  return (
    <>
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "absolute",
          top: 10,
          right: 0,
          left: 0,
        }}>
       
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          sx={{
            position: "absolute",
            top: 80,
            mx: "auto",
            width: 300,
          }}>
          <Tooltip title="Dislike">
          <IconButton
            /* style={{ backgroundColor: !canSwipe && "#83838077" }} */
            onClick={() => swipe("left")}
            color="warning"
            size="large">
            <CloseIcon font="large" />
          </IconButton>
          </Tooltip>
          {userDetail?.premium ? (
            <Tooltip title="Arrepentirse">
            <IconButton
              /* style={{ backgroundColor: !canGoBack }} */
              onClick={() => goBack()}
              color="primary"
              size="large">
                <ArrowBackIcon font="large" />
            </IconButton>
              </Tooltip>
          ) : (
            <Tooltip title="Arrepentirse">
            <IconButton
            /*   style={{ backgroundColor: !canGoBack }} */
              onClick={() => goBackPremium()}
              color="primary"
              size="large">
              
                <ArrowBackIcon font="large" />
              
            </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Like">
          <IconButton
            /* style={{ backgroundColor: !canSwipe && "#c838380773c4d3" }} */
            onClick={() => swipe("right")}
            color="info"
            size="large">
            <FavoriteIcon font="large" />
          </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {db.map((character, index) => (
        <Box
          key={character._id}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            marginTop: 18,
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
            onSwipe={(dir) => swiped(dir, character.name, index, character._id)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}>
            <Card
          sx={{
            width: 375,
            marginBottom: 14,
            borderColor: "none",
            borderRadius: 3,
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="566"
              style={{ backgroundImage: "url(" + userDetail?.image + ")" }}
              alt=""
              onClick
            />
          </CardActionArea>

          <CardActions disableSpacing sx={{ bgcolor: "inherit" }}>
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 900,
                // letterSpacing: 1,
                fontFamily: "Proxima Nova",
              }}
            >
              {userDetail?.name}{" "}
              <Typography
                sx={{
                  fontWeight: 300,
                  display: "inline",
                  fontSize: 20,
                  letterSpacing: 2,
                  fontFamily: "Proxima Nova",
                }}
              >
                {userDetail?.age}
              </Typography>
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              sx={{ color: "white" }}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            sx={{
              marginTop: -3,
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  right: 0,
                  left: 0,
                  marginTop: 1,
                }}
              >
                <Typography textTransform="uppercase">
                  <PersonOutlineIcon /> {userDetail?.gender}
                </Typography>
              </Box>
              {!userDetail?.description ? (
                <div />
              ) : (
                <Typography sx={{ letterSpacing: 3, fontStyle: "oblique" }}>
                  {userDetail?.description}
                </Typography>
              )}
              <Divider color="#ffff00" />
              {!userDetail?.city ? (
                <div />
              ) : (
                <Typography>
                  <LocationOnIcon /> {userDetail?.city}
                </Typography>
              )}
              {userDetail?.genderInt?.length === 0 ? (
                <div />
              ) : (
                <Typography>
                  <TransgenderIcon /> {userDetail?.genderInt}
                </Typography>
              )}
              {!userDetail?.phone ? (
                <div />
              ) : (
                <Typography>
                  <LocalPhoneIcon /> {userDetail?.phone}
                </Typography>
              )}

              {userDetail?.henryLevel?.length === 0 ? (
                <div />
              ) : (
                <Typography
                  textTransform="uppercase"
                  sx={{
                    display: "inline",
                    letterSpacing: 2,
                    fontFamily: "Proxima Nova",
                  }}
                >
                  <AttachFileIcon /> {userDetail?.henryLevel}
                </Typography>
              )}

              <Divider color="#ffff00" />
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  right: 0,
                  left: 0,
                  marginTop: 1,
                }}
              >
                {userDetail?.interests?.length === 0 ? (
                  <div />
                ) : (
                  <Typography>
                    <InterestsIcon />{" "}
                    {userDetail?.interests?.map((i) => {
                      return <div key={i}>{i}</div>;
                    })}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Collapse>
        </Card>
          </TinderCard>
        </Box>
      ))}
      
      
      {!canSwipe ? (
        <MsgContainer ref={containerRef} overflow="hidden">
          <Slide
            in={show}
            container={containerRef.current}
            timeout={{
              enter: 500,
              exit: 100,
            }}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <MsgText>{messages[messageIndex]}</MsgText>
            </Box>
          </Slide>
        </MsgContainer>
      ) : (
        <MsgContainer ref={containerRef} overflow="hidden">
          <Box display="flex" justifyContent="center" alignItems="center">
            <MsgText></MsgText>
          </Box>
        </MsgContainer>
      )}
    </>
  );
}