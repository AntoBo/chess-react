import { useEffect, useState } from "react";
import { boardInit } from "../../data/boardInit";
import { piecesInitSet } from "../../data/pieces";
import Cell from "../Cell/Cell";
import s from "./Board.module.scss";

const Board = () => {
  const [board, setBoard] = useState(boardInit);
  const [pieces, setPieces] = useState(piecesInitSet);
  const [move, setMove] = useState("");

  const handleInput = ({ key }) => {
    //clear input if
    if (key === "Escape" || key === "Backspace") {
      setMove("");
      return;
    }

    setMove((move) => move + key);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleInput);
    return () => {
      window.removeEventListener("keydown", handleInput);
    };
  });
  return (
    <>
      <div className={s.board}>
        {board.map((field, idx) => (
          <Cell
            key={idx}
            id={field.coor}
            piece={field.piece}
            armyColor={field.armyColor}
          />
        ))}
      </div>
      <p>Move listener: {move}</p>
    </>
  );
};

export default Board;
