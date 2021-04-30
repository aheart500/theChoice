import React, { useState, useEffect } from "react";

const TimeDisplay = ({ start }) => {
  const [timeDisplay, setTimeDisplay] = useState("");
  const startTimer = (duration) => {
    var timer = duration,
      minutes,
      seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setTimeDisplay(minutes + ":" + seconds);

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  };
  useEffect(() => {
    startTimer(60 * 60);
  }, []);
  return (
    <div className="timer">
      <p>Time Left</p>
      <h1>{start ? timeDisplay : "00:00"}</h1>
    </div>
  );
};

export default TimeDisplay;
