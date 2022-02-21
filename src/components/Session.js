import React from "react";
function Session({ title, changeTime, type, time, formatTime }) {
  return (
    <div id="session-label">
      <h3>{title}</h3>
      <div className="time-sets">
        <i
          id="session-decrement"
          className="btn-small cyan darken-2"
          onClick={() => changeTime(-60, type)}
          className="material-icons medium"
        >
          arrow_downward
        </i>
        <h3 id="session-length">{formatTime(time)}</h3>
        <i
          id="session-increment"
          className="btn-small cyan darken-2"
          className="material-icons medium"
          onClick={() => changeTime(60, type)}
        >
          arrow_upwards
        </i>
      </div>
    </div>
  );
}

export default Session;
