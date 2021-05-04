import React, { useState, useEffect } from "react";

const TimeDisplay = ({ start, time, handleFinish }) => {
  const [timeDisplay, setTimeDisplay] = useState("");

  useEffect(() => {
    const startTimer = (duration) => {
      var timer = duration,
        minutes,
        seconds;
      let tie = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        setTimeDisplay(minutes + ":" + seconds);

        if (--timer < 0) {
          handleFinish ? handleFinish() : console.log("finished");

          clearInterval(tie);
        }
      }, 1000);
    };
    startTimer(time ? time : 60 * 60);
  }, [time, handleFinish]);
  return <div className="timer">{start ? timeDisplay : "00:00"}</div>;
};

export default TimeDisplay;
