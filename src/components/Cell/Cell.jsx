import s from "./Cell.module.scss";

const Cell = ({ id, piece, armyColor, coor }) => {
  const cellColor = id % 2 === 0 ? "dark-bg" : "light-bg";

  return (
    <div
      className={`${s.cell} ${piece && s[piece]} ${armyColor && s[armyColor]} ${
        s[cellColor]
      }`}
    >
      <span>{coor}</span>
    </div>
  );
};

export default Cell;
