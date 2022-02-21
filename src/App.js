import { useState, useEffect } from "react";
import Break from "./components/Break";
import Session from "./components/Session";
import Beep from "./audio/beep.mp3";
function App() {
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [display, setDisplay] = useState(sessionTime);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const beepAudio = new Audio(Beep);

  const playBeepSound = () => {
    beepAudio.currentTime = 0;
    beepAudio.play();
  };
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };
  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = false;

    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplay((prev) => {
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  };
  useEffect(() => {
    if (display == 0 && !onBreak) {
      playBeepSound();
      setOnBreak(true);
      setDisplay(breakTime);
    } else if (display == 0 && onBreak) {
      playBeepSound();
      setOnBreak(false);
      setDisplay(sessionTime);
    }
  }, [display]);
  const resetTime = () => {
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setDisplay(25 * 60);
  };
  const changeTime = (amount, type) => {
    if (type == "break") {
      if (breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) {
        return;
      }
      setSessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplay(sessionTime + amount);
      }
    }
  };

  return (
    <div className="center-align">
      <h2>25 + 5 Clock</h2>
      <div className="length-displays">
        {" "}
        <Break
          title={"Break Length"}
          changeTime={changeTime}
          type={"break"}
          time={breakTime}
          formatTime={formatTime}
        />
        <Session
          title={"Session Length"}
          changeTime={changeTime}
          type={"session"}
          time={sessionTime}
          formatTime={formatTime}
        />
      </div>
      <h3>{onBreak ? "Break" : "Session"}</h3>

      <h1 id="displaySession">{formatTime(display)}</h1>
      <div className="buttons">
        {" "}
        <button className="btn-large cyan darken-2" onClick={controlTime}>
          {timerOn ? "Pause" : "Start"}
        </button>
        <button className="btn-large cyan darken-2" onClick={resetTime}>
          <i className="material-icons">autorenew</i>
        </button>
      </div>
    </div>
  );
}

export default App;
