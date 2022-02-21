import React from "react";
function Break({ title, changeTime, type, time, formatTime }) {
  return (
    <div id="break-label">
      <h3>{title}</h3>
      <div className="time-sets">
        <i
          id="break-decrement"
          className="btn-small cyan darken-2"
          onClick={() => changeTime(-60, type)}
          className="material-icons medium"
        >
          arrow_downward
        </i>
        <h3 id="break-length">{formatTime(time)}</h3>

        <i
          id="break-decrement"
          className="btn-small cyan darken-2"
          onClick={() => changeTime(60, type)}
          className="material-icons medium"
        >
          arrow_upwards
        </i>
      </div>
    </div>
  );
}

export default Break;
