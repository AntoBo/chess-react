const letters = ["a", "b", "c", "d", "e"];
let moveTo, moveFrom, board, turn;

const isValidMove = ({ move, incomingBoard, incomingTurns }) => {
  if (move.length < 4) {
    return;
  }

  moveFrom = move.slice(0, 2);
  moveTo = move.slice(2);
  board = incomingBoard;
  turn = incomingTurns.length % 2 === 0 ? "white" : "black";

  const isMoveFromOk = Boolean(board[moveFrom].rank);
  const isMoveToOk =
    isArmyTurn() &&
    isNotStamping() &&
    isMoveToFree() &&
    boardHasField() &&
    isRangeOk();

  return isMoveFromOk && isMoveToOk;
};

const isArmyTurn = () => {
  return turn === board[moveFrom].armyColor;
};

const isNotStamping = () => {
  return moveFrom !== moveTo;
};

const isMoveToFree = () => {
  return board[moveFrom].armyColor !== board[moveTo].armyColor;
};
const boardHasField = () => {
  return Boolean(board[moveTo]);
};
const isRangeOk = () => {
  let isRangeOk;
  const rank = board[moveFrom].rank;

  switch (rank) {
    case "king":
      isRangeOk = isKingsRangeOk();
      break;
    case "pawn":
      isRangeOk = isPawnsRangeOk();
      break;
    case "rook":
      isRangeOk = isRooksRangeOk();
      break;

    default:
      break;
  }
  return isRangeOk;
};
const isKingsRangeOk = () => {
  const fromLet = letters.indexOf(moveFrom[0]) + 1;
  const fromNum = Number(moveFrom[1]);

  const toLet = letters.indexOf(moveTo[0]) + 1;
  const toNum = Number(moveTo[1]);
  return Math.abs(fromNum - toNum) <= 1 && Math.abs(fromLet - toLet) <= 1;
};
const isPawnsRangeOk = () => {};
const isRooksRangeOk = () => {};

export default isValidMove;
