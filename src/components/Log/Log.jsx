import s from "./Log.module.scss";

const Log = ({ turnsLog, move }) => {
  return (
    <div className={s.container}>
      {" "}
      <p>
        {turnsLog.length % 2 === 0 ? "White" : "Black"} moves: {move}
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
