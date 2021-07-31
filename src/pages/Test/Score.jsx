import { Button } from "@material-ui/core";
import React from "react";

const sat_est_scoring = [
  200, 200, 210, 230, 240, 260, 280, 290, 310, 320, 330, 340, 360, 370, 380, 390, 410, 420, 430,
  440, 450, 460, 470, 480, 480, 490, 500, 510, 520, 520, 530, 540, 550, 560, 560, 570, 580, 590,
  600, 600, 610, 620, 630, 640, 650, 660, 670, 670, 680, 690, 700, 710, 730, 740, 750, 760, 780,
  790, 800,
];
const act_scroing = [
  1, 4, 6, 8, 10, 11, 12, 12, 13, 13, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18,
  18, 19, 19, 20, 21, 21, 22, 23, 23, 24, 24, 25, 25, 25, 26, 26, 27, 27, 27, 28, 28, 28, 29, 29,
  30, 30, 31, 31, 32, 33, 34, 34, 35, 35, 36, 36,
];

const Score = ({
  correctQuestionsLength,
  questionsLength,
  setReview,
  timeUp,
  testType,
  withReview,
}) => {
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
        You scored {correctQuestionsLength} Out of {questionsLength} Questions
      </h1>
      <h2>
        {["act", "sat", "est"].includes(testType)
          ? `${testType.toUpperCase()} Score equals: ${
              ["sat", "est"].includes(testType)
                ? sat_est_scoring[correctQuestionsLength]
                : act_scroing[correctQuestionsLength]
            }`
          : ""}
      </h2>
      {withReview && (
        <Button variant="contained" color="primary" onClick={() => setReview(true)}>
          Review
        </Button>
      )}
    </div>
  );
};

export default Score;
