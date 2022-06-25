import React, { useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";

import TinderCard from "react-tinder-card";
import "./Card.css";

import CloseIcon from "@mui/icons-material/Close";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Card() {
  const db = useSelector((state) => state.users);
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
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

  const swiped = (direction, nameToDelete, index, id) => {
    console.log(
      "a",
      nameToDelete,
      "lo enviaste a la",
      direction,
      "y tiene el id",
      id
    );
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
    <div className="boxCard">
      <div className="card">
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character._id}
            onSwipe={(dir) => swiped(dir, character.name, index, character._id)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}>
            <div className="carddd">
              <div>
                <h3>
                  {character.name} {character.age}
                </h3>
              </div>
              <div
                style={{ backgroundImage: "url(" + character.image + ")" }}
                className="inter"></div>
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
        <h2 className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  );
}

export default Card;
