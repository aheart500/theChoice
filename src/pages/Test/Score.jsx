import { Button } from "@material-ui/core";
import React from "react";

const Score = ({ correctQuestionsLength, questionsLength, setReview, timeUp }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>{timeUp ? "Time is Up!!!" : ""}</h1>
      <h1>
        You scored {correctQuestionsLength} Out of {questionsLength}
      </h1>
      <Button variant="contained" color="primary" onClick={() => setReview(true)}>
        Review
      </Button>
    </div>
  );
};

export default Score;
