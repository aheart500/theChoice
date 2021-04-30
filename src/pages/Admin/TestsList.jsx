import React, { useState, useEffect } from "react";
import AddTest from "./AddTest";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
const TestsList = () => {
  const [tests, setTests] = useState([]);

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
  console.log(tests);
  return (
    <div>
      <h1>Tests</h1>
      <AddTest addTest={(data) => setTests([...tests, data])} />

      {tests.map(({ name, duration, id }) => {
        return (
          <div key={id}>
            <Link to={`/admin/test/${id}`}>
              {name} -- {duration} minutes
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TestsList;
