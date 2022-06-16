import s from "./Cell.module.scss";

const Cell = ({ id, piece, armyColor }) => {
  const paintSell = (id) => {};
  return (
    <div
      className={`${s.cell} ${piece && s[piece]} ${armyColor && s[armyColor]}`}
    >
      {id}
    </div>
  );
};

export default Cell;
