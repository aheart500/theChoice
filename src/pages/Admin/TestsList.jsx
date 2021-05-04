import React, { useState, useEffect } from "react";
import AddTest from "./AddTest";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import Button from "@material-ui/core/Button";
const TestsList = () => {
  const [tests, setTests] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
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

      {tests.map(({ name, type, id }) => {
        return (
          <div key={id}>
            <Link to={`/admin/test/${id}`}>
              {name} -- {type.toUpperCase()} Test
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TestsList;
