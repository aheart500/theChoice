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
          <div>
            <h2>Name</h2>
            <h3>{student?.name}</h3>
          </div>
          <div>
            <h2>Grade</h2>
            <h3>{student?.grade}</h3>
          </div>
          <div>
            <h2>Email</h2>
            <h3>{student?.email}</h3>
          </div>
          <div>
            <h2>Phone</h2>
            <h3>{student?.phone}</h3>
          </div>
          <div>
            <h2>ACT</h2>
            <h3>{student?.act}</h3>
          </div>
          <div>
            <h2>SAT</h2>
            <h3>{student?.sat}</h3>
          </div>
          <div>
            <h2>EST</h2>
            <h3>{student?.est}</h3>
          </div>
          <div>
            <h2>Group Code</h2>
            <h3>{student?.groupCode}</h3>
          </div>
          <div>
            <h2>Parent Name</h2>
            <h3>{student?.parentName}</h3>
          </div>
          <div>
            <h2>Parent Phone</h2>
            <h3>{student?.parentNumber}</h3>
          </div>
        </div>
        <div className="academic-info">Academic Info</div>

        <div className="data-points">
          {student.testsTaken
            ? student.testsTaken.map((test, i) => {
                return (
                  <div
                    key={i}
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
