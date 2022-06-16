let moveTo, moveFrom, board;

const isValidMove = ({ move, incomingBoard }) => {
  if (move.length < 4) {
    return;
  }

  moveFrom = move.slice(0, 2);
  moveTo = move.slice(2);
  board = incomingBoard;

  const isMoveFromOk = Boolean(board[moveFrom].rank);
  const isMoveToOk = isMoveToFree() && boardHasField() && isRangeOk();

  return isMoveFromOk && isMoveToOk;
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

    default:
      break;
  }
  return isRangeOk;
};

const isKingsRangeOk = () => {
  //   console.log("isKingsRangeOk");
  return true;
};

export default isValidMove;
