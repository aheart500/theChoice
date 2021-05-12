import React, { useState, useEffect } from "react";
import AddTest from "./AddTest";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
const TestsList = () => {
  const [tests, setTests] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const handleActiveSwitch = (testId, active) => {
    setLoading(true);
    firebase
      .firestore()
      .collection("tests")
      .doc(testId)
      .update({
        active,
      })
      .then(() => {
        setTests(tests.map((test) => (test.id === testId ? { ...test, active } : test)));
        setLoading(false);
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

      {tests.map(({ name, type, id, active }) => {
        return (
          <div key={id}>
            <Link to={`/admin/test/${id}`}>
              {name} -- {type.toUpperCase()} Test
            </Link>

            <Switch
              checked={active}
              onChange={(e) => handleActiveSwitch(id, e.target.checked)}
              disabled={loading}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TestsList;
