import React, { useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";

import TinderCard from "react-tinder-card";
import "./Card.css";



import CloseIcon from '@mui/icons-material/Close';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from "@mui/icons-material/Info";
import { DetailContainer, Box, Info} from './DetailStyle'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CakeIcon from '@mui/icons-material/Cake';


function Card({usersSelected}) {
  // const usersSelected = useSelector((state) => state.usersSelected);
  const [currentIndex, setCurrentIndex] = useState(usersSelected.length - 1);
  const [lastDirection, setLastDirection] = useState();

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(usersSelected.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < usersSelected.length - 1;

  const canSwipe = currentIndex >= 0;


    const swiped = (direction, nameToDelete, index, id) => {
    console.log('a', nameToDelete, 'lo enviaste a la', direction, 'y tiene el id', id);
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {

    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < usersSelected.length) {
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
    <div  className="boxCard">
      <div className="card">
        {usersSelected.map((character, index) => (
          <TinderCard
                ref={childRefs[index]}
                className="swipe"
                preventSwipe={['up','down']}
                key={character.id}
                onSwipe={(dir) => swiped(dir, character.name, index, character._id)}
                onCardLeftScreen={() => outOfFrame(character.name, index)}
                >
                <div  className="carddd">
                    <div>
                    <h3>{character.name} {character.age}</h3>
                    </div>
                    <DetailContainer
                        style={{ backgroundImage: "url(" + character.image + ")" }}
                        className="inter"
                        >
                        <Info>
                        <IconButton>
                        <InfoIcon />
                        </IconButton>
                        <Box>
                            <hr/>
                            {character.description}
                            <hr></hr>
                            <PersonOutlineIcon/> {character.gender}
                            <hr/>
                            <CakeIcon/> {character.birthday}
                            <hr/>
                            Etapa del Bootcamp: {character.henryLevel}
                        </Box>
                        </Info>
                    </DetailContainer>
                    
                    
                </div>

          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <IconButton
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("left")}
          color="secondary"
          size="large">
          <CloseIcon font="large" />
        </IconButton>
        <IconButton
          style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
          onClick={() => goBack()}
          color="secondary"
          size="large">
          <ArrowBackIcon font="large" />
        </IconButton>
        <IconButton
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("right")}
          color="primary"
          size="large">
          <FavoriteIcon font="large" />
        </IconButton>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2  className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  );
}

export default Card;
