import { useEffect, useState } from "react";
import { boardInit } from "../../data/boardInit";
// import { piecesInitSet } from "../../data/pieces";
import isValidMove from "../../logic/isValidMove";
import Cell from "../Cell/Cell";
import Log from "../Log/Log";
import s from "./Board.module.scss";

const Board = () => {
  const [board, setBoard] = useState(boardInit);
  const [turns, setTurns] = useState([]);
  const [move, setMove] = useState("");

  const handleInput = ({ key }) => {
    //clear input if
    if (key === "Escape" || key === "Backspace") {
      setMove("");
      return;
    }
    setMove((move) => move + key);
    if (
      isValidMove({
        move: move + key,
        incomingBoard: board,
        incomingTurns: turns,
      })
    ) {
      const moveFrom = move.slice(0, 2);
      const moveTo = move.slice(2);
      setBoard((board) => ({
        ...board,
        [moveFrom]: {},
        [moveTo + key]: board[moveFrom],
      }));
      setMove("");
      setTurns((turns) => [
        ...turns,
        `${
          Boolean(board[moveFrom].rank !== "pawn")
            ? board[moveFrom].rank[0].toUpperCase()
            : ""
        }${moveFrom}-${moveTo + key}`,
      ]);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleInput);
    return () => {
      window.removeEventListener("keydown", handleInput);
    };
  });
  return (
    <div className={s.container}>
      <div className={s.board}>
        {Object.entries(board).map((el, idx) => (
          <Cell
            key={el[0]}
            coor={el[0]}
            id={idx}
            piece={el[1].rank}
            armyColor={el[1].armyColor}
          />
        ))}
      </div>
      <Log turnsLog={turns} move={move} />
    </div>
  );
};

export default Board;
