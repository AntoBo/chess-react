const isValidMove = ({ move, board }) => {
  //   if (move.length === 4) {
  //     return true;
  //   }
  //   console.log("isValidMove is ", move);
  return move.length === 4;
};

export default isValidMove;
