import { useEffect, useState } from "react";
import { boardInit } from "../../data/boardInit";
// import { piecesInitSet } from "../../data/pieces";
import isValidMove from "../../logic/isValidMove";
import Cell from "../Cell/Cell";
import s from "./Board.module.scss";

const Board = () => {
  const [board, setBoard] = useState(boardInit);
  //   const [pieces, setPieces] = useState(piecesInitSet);
  const [move, setMove] = useState("");

  const handleInput = ({ key }) => {
    //clear input if
    if (key === "Escape" || key === "Backspace") {
      setMove("");
      return;
    }

    setMove((move) => move + key);
    if (isValidMove({ move: move + key, incomingBoard: board })) {
      const moveFrom = move.slice(0, 2);
      const moveTo = move.slice(2);
      setBoard((board) => ({
        ...board,
        [moveFrom]: {},
        [moveTo + key]: board[moveFrom],
      }));
      setMove("");
    }
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
        {Object.entries(board).map((el) => (
          <Cell
            key={el[0]}
            id={el[0]}
            piece={el[1].rank}
            armyColor={el[1].armyColor}
          />
        ))}
      </div>
      <p>White moves: {move}</p>
    </>
  );
};

export default Board;
