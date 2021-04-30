import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import AddQuestion from "./AddQuestion";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { AddedQuestionNotif, RemovedQuestionNotif } from "./notifs";
const width = "66.5%";
const useStyle = makeStyles(() => ({
  questionCard: {
    margin: "1rem 0",
  },
  image: {
    width,
    height: "20rem",
  },
}));

const Test = ({ match: { params } }) => {
  const classes = useStyle();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const testRef = firebase.firestore().collection("tests").doc(params.id);
  useEffect(() => {
    testRef
      .get()
      .then((response) => {
        setTest({ id: response.id, ...response.data() });
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [params.id, testRef]);

  if (loading) return null;
  if (!test) return <h1>No Test found</h1>;
  const questions = test.questions;
  const handleAddQuestion = (data) => {
    testRef
      .update({
        questions: firebase.firestore.FieldValue.arrayUnion(data),
      })
      .then(() => AddedQuestionNotif())
      .catch((e) => console.log(e));
  };
  const handleRemoveQuestion = (index) => {
    testRef
      .update({
        questions: firebase.firestore.FieldValue.arrayRemove(questions[index]),
      })
      .then(() => RemovedQuestionNotif())
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>
          {test.name} -- {test.duration} Minutes
        </h1>
        <p>{questions.length} Questions</p>
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          + Add question
        </Button>
      </div>
      <AddQuestion
        addQuestion={handleAddQuestion}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
      {questions.length
        ? questions.map((question, i) => {
            return (
              <div key={i} className={classes.questionCard}>
                <h2>Question {i + 1}</h2>
                <img src={question.image} alt="questionImage" className={classes.image} />
                <div style={{ display: "flex", justifyContent: "space-between", width }}>
                  <h4>Answer is: {question.correctAnswer}</h4>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveQuestion(i)}
                  >
                    Delete Question
                  </Button>
                </div>
              </div>
            );
          })
        : "No questions added yet"}
    </div>
  );
};

export default Test;
