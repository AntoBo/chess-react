import s from "./Log.module.scss";

const Log = ({ turnsLog, move, warning }) => {
  return (
    <div className={s.wrapper}>
      <p>
        {turnsLog.length % 2 === 0 ? "White" : "Black"} moves:{" "}
        <span className={s.move}>{move}</span>
        <span className={s.warning}>{warning}</span>
      </p>
      <p>Moves log:</p>
      <ul className={s.list}>
        {turnsLog.map((turn, idx) => (
          <li key={idx}>{turn}</li>
        ))}
      </ul>
    </div>
  );
};

export default Log;
