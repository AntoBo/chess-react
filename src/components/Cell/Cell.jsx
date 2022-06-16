import s from "./Cell.module.scss";

const Cell = ({ id, piece, armyColor, bgc }) => {
  //   const paintSell = (id) => {};
  return (
    <div
      className={`${s.cell} ${piece && s[piece]} ${armyColor && s[armyColor]} ${
        s[bgc]
      }`}
    >
      {id}
    </div>
  );
};

export default Cell;
