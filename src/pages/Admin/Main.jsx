import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../Contexts/User/UserContext";
import firebase from "firebase/app";
import TestsList from "./TestsList";
const Main = () => {
  const { userState } = useContext(UserContext);

  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    const snapshot = await firebase.firestore().collection("users").get();
    return snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  };
  useEffect(() => {
    getStudents()
      .then((response) => {
        setStudents(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
      <TestsList />
      {userState.adminType !== "Editor" && (
        <div>
          <h1>Students</h1>
          <div
            style={{
              height: "90%",
              overflow: "auto",
              marginTop: "1rem",
            }}
          >
            {students.map((student) => {
              return (
                <div
                  key={student.id}
                  style={{
                    cursor: "pointer",
                    marginBottom: "0.5rem",
                  }}
                  onClick={() => window.location.replace(`/student/${student.id}`)}
                >
                  <h2>{student.name}</h2>
                  <p>{student.email}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
