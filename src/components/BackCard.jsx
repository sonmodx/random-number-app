import React, { useContext, useState } from "react";
import "../styles/back-card.css";
import { CardContext } from "../CardContext";

const BackCard = () => {
  const { setIsFront, dispatch, state } = useContext(CardContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const app = document.querySelector(".app");
  console.log("isWin", isWin);

  const reset = () => {
    setIsFront(true);
    setIsWin(false);
    setIsOpen(false);
    dispatch({ type: "RESET" });
  };

  const isMatch = () => {
    const _randomIndex = Math.floor(Math.random() * state.listLot.length);
    const _randomNumber = state.listLot[_randomIndex];
    dispatch({ type: "SET_RANDOM_NUMBER", payload: _randomNumber });
    setIsOpen(true);
    const newListLot = state.listLot.filter((num) => num !== _randomNumber);
    dispatch({ type: "UPDATE_LIST_LOT", payload: newListLot });
    console.log("random", _randomNumber);
    if (state.luckyNumbers.includes(_randomNumber)) {
      dispatch({ type: "SET_WINNERS" });
      setIsWin(true);
      app.classList.add("yellow-bg");
      return;
    }
    setIsWin(false);
  };

  const handleNewDraw = () => {
    setIsOpen(false);
    if (app.classList.contains("yellow-bg"))
      document.querySelector(".app").classList.remove("yellow-bg");
  };
  return (
    <div className="back-card">
      <div className="reset">
        <button onClick={() => document.getElementById("modal").showModal()}>
          RESET
        </button>
      </div>
      <dialog className="modal" id="modal">
        <form method="dialog">
          <p>Do you want to reset?</p>
          <button onClick={reset}>Reset</button>
          <button className="close-btn">Close</button>
        </form>
      </dialog>
      <header>
        <h1>Lucky Numbers</h1>
        <p>{state.luckyNumbers.join(",")}</p>
      </header>
      <section>
        <div className="tab">
          {!isOpen ? (
            <button onClick={isMatch}>Tab to open</button>
          ) : (
            <div>
              <p>{state.randomNumber}</p>
              {isWin ? (
                <p>
                  Winner! <i className="fa-solid fa-face-smile"></i>
                </p>
              ) : (
                <p>
                  Sorry <i className="fa-solid fa-face-sad-cry"></i>
                </p>
              )}
            </div>
          )}
        </div>
        <p>
          Winner&#40;s&#41; : {state.totalWinners}&#47;
          {state.luckyNumbers.length}
        </p>
      </section>
      {isOpen && (
        <div className="new-draw">
          <button onClick={handleNewDraw}>New Draw</button>
        </div>
      )}
    </div>
  );
};

export default BackCard;
