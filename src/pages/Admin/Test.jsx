import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import AddQuestion from "./AddQuestion";
const Test = ({ match: { params } }) => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase
      .firestore()
      .collection("tests")
      .doc(params.id)
      .get()
      .then((response) => {
        setTest({ id: response.id, ...response.data() });
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return null;
  if (!test) return <h1>No Test found</h1>;
  const questions = test.questions;
  const handleAddQuestion = (data) => {
    console.log(data);
  };
  return (
    <div>
      {test.name} -- {test.duration}
      <AddQuestion addQuestion={handleAddQuestion} />
      {JSON.stringify(questions, null, 2)}
    </div>
  );
};

export default Test;
