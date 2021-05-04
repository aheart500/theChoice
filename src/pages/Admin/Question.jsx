import React from "react";
import Button from "@material-ui/core/Button";
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
const Question = ({ question, i, handleRemoveQuestion }) => {
  const classes = useStyle();
  return (
    <div key={i} className={classes.questionCard}>
      <h2>Question {i + 1}</h2>
      <img src={question.image} alt="questionImage" className={classes.image} />
      <div style={{ display: "flex", justifyContent: "space-between", width: "66.5%" }}>
        <h4>Answer is: {question.correctAnswer}</h4>
        <Button variant="contained" color="secondary" onClick={() => handleRemoveQuestion(i)}>
          Delete Question
        </Button>
      </div>
    </div>
  );
};

export default Question;
