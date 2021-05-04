import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => ({
  questionCard: {
    margin: "1rem 0",
  },
  image: {
    width: "66.5%",
    height: "20rem",
  },
}));
const Question = ({ question }) => {
  const classes = useStyle();
  return (
    <div key={question.number} className={classes.questionCard}>
      <h2>Question {question.number}</h2>
      <img src={question.image} alt="questionImage" className={classes.image} />
      <div style={{ display: "flex", justifyContent: "space-between", width: "66.5%" }}></div>
    </div>
  );
};

export default Question;
