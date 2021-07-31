import React, { useState, useEffect } from "react";
import AddTest from "./AddTest";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const initialLoadingState = { testID: "", type: "", state: false };

const TestsList = () => {
  const classes = useStyles();
  const [tests, setTests] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(initialLoadingState);
  const getTests = async () => {
    const snapshot = await firebase.firestore().collection("tests").orderBy("created").get();
    return snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  };

  useEffect(() => {
    getTests()
      .then((response) => {
        setTests(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const handleSwitch = (type, testId, state) => {
    setLoading({ testID: testId, state: true, type });
    firebase
      .firestore()
      .collection("tests")
      .doc(testId)
      .update({
        [type]: state,
      })
      .then(() => {
        setTests(tests.map((test) => (test.id === testId ? { ...test, [type]: state } : test)));
        setLoading(initialLoadingState);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Tests</h1>
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          + Add Test
        </Button>
      </div>
      <AddTest
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        addTest={(data) => setTests([...tests, data])}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Undertakers</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Active</TableCell>
              <TableCell align="right">With Review </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.map(({ name, type, id, active, withReview, underTakers }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  <Link to={`/admin/test/${id}`}> {name} </Link>
                </TableCell>
                <TableCell align="center">{underTakers.length}</TableCell>
                <TableCell align="right">{type.toUpperCase()}</TableCell>
                <TableCell align="right">
                  <Switch
                    checked={active}
                    onChange={(e) => handleSwitch("active", id, e.target.checked)}
                    disabled={loading.testID === id && loading.type === "active"}
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={withReview}
                    onChange={(e) => handleSwitch("withReview", id, e.target.checked)}
                    disabled={loading.testID === id && loading.type === "withReview"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TestsList;
