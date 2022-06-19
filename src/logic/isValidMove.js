const letters = ["a", "b", "c", "d", "e"];
let moveTo, moveFrom, fromLet, fromNum, toLet, toNum, board, turn;

const isValidMove = ({ move, incomingBoard, incomingTurns }) => {
  moveFrom = move.slice(0, 2);
  moveTo = move.slice(2);
  fromLet = letters.indexOf(moveFrom[0]) + 1;
  fromNum = Number(moveFrom[1]);
  toLet = letters.indexOf(moveTo[0]) + 1;
  toNum = Number(moveTo[1]);
  board = incomingBoard;
  turn = incomingTurns.length % 2 === 0 ? "white" : "black";

  const isMoveFromOk = Boolean(board[moveFrom]?.rank);
  const isMoveToOk =
    isArmyTurn() &&
    isNotStamping() &&
    isMoveToFree() &&
    boardHasField() &&
    isRangeOk();

  return isMoveFromOk && isMoveToOk;
};

const isArmyTurn = () => {
  return turn === board[moveFrom]?.armyColor;
};

const isNotStamping = () => {
  return moveFrom !== moveTo;
};

const isMoveToFree = () => {
  return board[moveFrom]?.armyColor !== board[moveTo]?.armyColor;
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
    case "nknight":
      isRangeOk = isKnightRangeOk();
      break;

    default:
      break;
  }
  return isRangeOk;
};
const isKingsRangeOk = () =>
  Math.abs(fromNum - toNum) <= 1 && Math.abs(fromLet - toLet) <= 1;

const isPawnsRangeOk = () => {
  const dir = turn === "white" ? 1 : -1;
  const canMove = () =>
    fromNum === toNum &&
    toLet - fromLet === 1 * dir &&
    Boolean(!board[moveTo].rank);
  const canHit = () => {
    return (
      Boolean(board[moveTo].armyColor) &&
      Boolean(board[moveTo].armyColor !== turn) &&
      Math.abs(fromLet - toLet) <= 1 &&
      Math.abs(fromNum - toNum) === 1
    );
  };
  return canMove() || canHit();
};
const isRooksRangeOk = () => {
  const getPathFromLets = () => {
    const long = Math.abs(fromLet - toLet) > 0 ? Math.abs(fromLet - toLet) : 1;
    const min = Math.min(fromLet, toLet);
    const lineArr = [...Array(long - 1).keys()].map((i) => i + min + 1);
    const path = lineArr.map((el, idx) => letters[idx + min] + fromNum);
    return path;
  };
  const getPathFromNums = () => {
    const long = Math.abs(fromNum - toNum) > 0 ? Math.abs(fromNum - toNum) : 1;
    const min = Math.min(fromNum, toNum);
    const lineArr = [...Array(long - 1).keys()].map((i) => i + min + 1);
    const path = lineArr.map((el, idx) => moveFrom[0] + el);
    return path;
  };

  const isObstacles = (path) => path.some((el) => board[el]?.rank);
  const isStraight =
    (fromNum === toNum && !isObstacles(getPathFromLets())) || //vert
    (fromLet === toLet && !isObstacles(getPathFromNums())); //hor
  return isStraight;
};

const isKnightRangeOk = () => {
  return (
    (Math.abs(fromLet - toLet) === 2 && Math.abs(fromNum - toNum) === 1) ||
    (Math.abs(fromLet - toLet) === 1 && Math.abs(fromNum - toNum) === 2)
  );
};

export default isValidMove;
