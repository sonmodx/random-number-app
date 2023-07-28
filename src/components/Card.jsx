import React, { useEffect, useReducer, useState } from "react";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";
import "../styles/card.css";
import { CardContext } from "../CardContext";
import { INIT_STATE, reducer } from "../reducer";

const Card = () => {
  const [isFront, setIsFront] = useState(true);
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  console.log(state);
  let isMount = true;

  useEffect(() => {
    if (!isMount) return;
    const card = document.querySelector(".card");
    if (!isFront) {
      card?.classList.add("flip");
    } else {
      card?.classList.remove("flip");
    }
    console.log(card.classList);
    return () => {
      isMount = false;
    };
  }, [isFront]);
  return (
    <div className="card">
      <div className="card-inner">
        <CardContext.Provider value={{ setIsFront, dispatch, state }}>
          <FrontCard />
          <BackCard />
        </CardContext.Provider>
      </div>
    </div>
  );
};

export default Card;
