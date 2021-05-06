import React, { useState, useEffect, useRef } from "react";

const TimeDisplay = ({ start, time, handleFinish }) => {
  const [timer, setTimer] = useState(time);

  const foo = useRef();

  useEffect(() => {
    function tick() {
      setTimer((prevSeconds) => prevSeconds - 1);
    }
    foo.current = setInterval(() => tick(), 1000);
    return () => clearInterval(foo.current);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(foo.current);
      handleFinish();
    }
  }, [timer, handleFinish]);
  useEffect(() => {
    setTimer(time);
  }, [time]);

  let minutes = parseInt(timer / 60, 10);
  let seconds = parseInt(timer % 60, 10);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return <div className="timer">{start ? `${minutes}:${seconds}` : "00:00"}</div>;
};

export default TimeDisplay;
