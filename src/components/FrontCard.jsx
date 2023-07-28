import React, { useContext, useRef, useState } from "react";
import "../styles/front-card.css";
import { CardContext } from "../CardContext";

const FrontCard = () => {
  const [isError, setIsError] = useState(false);
  const { setIsFront, dispatch } = useContext(CardContext);
  const numberOfLotRef = useRef();
  const listLuckyNumberRef = useRef();
  const changeToBackCard = (e) => {
    e.preventDefault();
    const numberOfLot = numberOfLotRef.current.value;
    const lengthListLot = Number(numberOfLot);
    const listLuckyNumber = listLuckyNumberRef.current.value.trim();
    const splitLuckNumber = listLuckyNumber.split(",");
    if (
      !/^\d+$/.test(numberOfLot) ||
      !/^(\d+)(\s*,\s*\d+)*$/.test(listLuckyNumber)
    ) {
      setIsError(true);
      return;
    }
    if (lengthListLot < splitLuckNumber.length) {
      setIsError(true);
      return;
    }
    dispatch({ type: "SET_LIST_LOT", payload: lengthListLot });
    dispatch({
      type: "SET_LUCKY_NUMBERS",
      payload: splitLuckNumber,
    });
    listLuckyNumberRef.current.value = "";
    numberOfLotRef.current.value = "";
    setIsFront(false);
  };
  return (
    <div className="front-card">
      <header>
        <h1>Settings</h1>
      </header>
      <form onSubmit={changeToBackCard}>
        <div className="input-field">
          <label htmlFor="numberOfLot">จำนวนฉลาก</label>
          <input
            type="text"
            id="numberOfLot"
            ref={numberOfLotRef}
            placeholder=""
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="listLuckyNumber">Lucky Number&#40;s&#41;</label>
          <input
            type="text"
            id="listLuckyNumber"
            ref={listLuckyNumberRef}
            placeholder="1, 2, 3, 4, 5"
            required
          />
        </div>
        {isError && <p className="error">Wrong input!</p>}
        <button type="submit" className="confirm-btn">
          Confirm&rarr;
        </button>
      </form>
    </div>
  );
};

export default FrontCard;
