import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";
import AddQuestion from "./AddQuestion";
import Button from "@material-ui/core/Button";
import { AddedQuestionNotif, RemovedQuestionNotif } from "./notifs";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Question from "./Question";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import UserContext from "../../Contexts/User/UserContext";
const useStyles = makeStyles({
  table: {
    maxWidth: 650,
  },
});
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
};

const Test = ({ match: { params } }) => {
  const classes = useStyles();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const testRef = firebase.firestore().collection("tests").doc(params.id);
  const { userState } = useContext(UserContext);
  useEffect(() => {
    testRef
      .get()
      .then((response) => {
        setTest({ id: response.id, ...response.data() });
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

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
  const withSections = ["sat", "est"].includes(test.type);
  const handleSectionChange = (event, newValue) => {
    setCurrentSection(newValue);
  };
  const renderQuestions = (qs) => {
    return qs.map((question, i) => {
      return (
        <Question key={i} i={i} question={question} handleRemoveQuestion={handleRemoveQuestion} />
      );
    });
  };
  const editor = userState.adminType === "Editor";
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>
          {test.name} -- {test?.type?.toUpperCase()} Test
        </h1>
        <p>{questions?.length} Questions</p>
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          + Add question
        </Button>
      </div>
      <AddQuestion
        addQuestion={handleAddQuestion}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        withSections={withSections}
      />
      <TableContainer className={classes.table} component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {test.underTakers.map(({ id, name, score }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  <div
                    style={{
                      cursor: editor ? "unset" : "pointer",
                      color: editor ? "black" : "blue",
                    }}
                    onClick={() => !editor && window.location.replace(`/student/${id}`)}
                  >
                    {name}
                  </div>
                </TableCell>
                <TableCell align="right">{score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!withSections ? (
        questions?.length ? (
          renderQuestions(questions)
        ) : (
          "No questions added yet"
        )
      ) : (
        <>
          <Tabs value={currentSection} onChange={handleSectionChange}>
            <Tab label="Section One" />
            <Tab label="Section Two" />
          </Tabs>

          <TabPanel value={currentSection} index={0}>
            {renderQuestions(questions.filter((quis) => quis.section === "1"))}
          </TabPanel>
          <TabPanel value={currentSection} index={1}>
            {renderQuestions(questions.filter((quis) => quis.section === "2"))}
          </TabPanel>
        </>
      )}
    </div>
  );
};

export default Test;
