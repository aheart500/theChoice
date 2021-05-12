import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { FaCalculator, FaBan } from "react-icons/fa";
const useStyle = makeStyles(() => ({
  questionCard: {
    margin: "1.5rem 3rem",
  },
  image: {
    maxWidth: "90%",
    maxHeight: "25rem",
  },
}));
const mcqSets = [
  ["a", "b", "c", "d"],
  ["a", "b", "c", "d", "e"],
  ["f", "g", "h", "i", "j", "k"],
];
const Question = ({ question, index, setAnswer, review, testType, currentSection }) => {
  const classes = useStyle();
  if (!question) return <h1>No Questions Added Yet</h1>;
  const validate = (ans) => {
    return review
      ? question.correctAnswer === ans
        ? " -- Correct Answer"
        : question.userAnswer === ans && question.correctAnswer !== ans
        ? " -- Your Answer"
        : ""
      : "";
  };
  return (
    <div key={question.number} className={classes.questionCard}>
      <h2>
        Question {index}{" "}
        {testType === "sat" && currentSection === 1 && (
          <div style={{ position: "relative" }}>
            <FaBan size="4em" className="ban" />
            <FaCalculator size="2em" className="calc" />
          </div>
        )}
      </h2>
      <img src={question.image} alt="questionImage" className={classes.image} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "66.5%",
          marginBottom: "1rem",
        }}
      ></div>
      {question.type === "mcq" ? (
        <FormControl component="fieldset" disabled={review}>
          <FormLabel component="legend">Select correct Answer</FormLabel>
          <RadioGroup
            name="ans"
            value={question.userAnswer}
            onChange={(e) => setAnswer(question.number, e.target.value)}
          >
            {mcqSets[parseInt(question.mcqSet)]?.map((a, i) => {
              return (
                <FormControlLabel
                  key={i}
                  value={a}
                  control={<Radio />}
                  label={`${a.toUpperCase()}          ${validate(a)}`}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      ) : (
        <TextField
          label="Correct Answer"
          value={question.userAnswer}
          onChange={(e) => setAnswer(question.number, e.target.value)}
          disabled={review}
          helperText={review && `Correct Answer is ${question.correctAnswer}`}
        />
      )}
    </div>
  );
};

export default Question;
