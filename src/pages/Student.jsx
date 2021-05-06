import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import Loader from "../components/Loader/Loader";
const Student = ({ match: { params } }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const studentRef = firebase.firestore().collection("users").doc(params.id);
  useEffect(() => {
    studentRef
      .get()
      .then((response) => {
        setStudent({ id: response.id, ...response.data() });
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [params.id, studentRef]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="profile">
        <div className="personal-info">Personal Info</div>
        <div className="data-points">
          <h2>Name</h2>
          <h3>{student?.name}</h3>
          <h2>Grade</h2>
          <h3>{student?.grade}</h3>
          <h2>Email</h2>
          <h3>{student?.email}</h3>
          <h2>Phone</h2>
          <h3>{student?.phone}</h3>
        </div>
        <div className="academic-info">Academic Info</div>

        <div className="data-points">
          {student.testsTaken
            ? student.testsTaken.map((test) => {
                return (
                  <div
                    key={test.id}
                    style={{ display: "flex", justifyContent: "space-between", width: "40rem" }}
                  >
                    <h1>
                      {test.name} --- {test.type}
                    </h1>
                    <h2>
                      {test.score} / {test.totalQuestions}
                    </h2>
                  </div>
                );
              })
            : "You haven't done any tests yet"}
        </div>
      </div>
    </div>
  );
};

export default Student;
