import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import UserContext from "../Contexts/User/UserContext";
const filterTestsArray = ["all"];
const PreTest = () => {
  const [tests, setTests] = useState([]);
  const { userState } = useContext(UserContext);

  if (userState?.groupCode) filterTestsArray.push(userState.groupCode);

  useEffect(() => {
    const getTests = async () => {
      const snapshot = await firebase
        .firestore()
        .collection("tests")
        .where("availability", "in", filterTestsArray)
        .orderBy("created")
        .get();
      return snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    };
    getTests()
      .then((result) => {
        setTests(result);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="preTestContianer">
      <Header />
      <div className="pretest-content">
        <div className="test-title">
          <h1>Practice Test</h1>
        </div>
        <div className="modal-content">
          <h1>Hi {userState.name}!</h1>
          {userState.uid ? (
            tests?.map((test) => {
              const withSections = ["sat", "est"].includes(test.type);
              return (
                <Link to={`/test/${test.id}`} key={test.id} style={{ margin: "1rem 0" }}>
                  {test.name} -- {test.type.toUpperCase()} MATH
                  {withSections
                    ? ` --  2 Sections (${test.type === "sat" ? "25" : "20"}, 55) Mins`
                    : test.type === "act"
                    ? " -- 60 Mins"
                    : test.duration}
                </Link>
              );
            })
          ) : (
            <div>
              <Link to="/signin">Sign in</Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default PreTest;
