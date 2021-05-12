import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import firebase from "firebase/app";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../Contexts/User/UserContext";

const filterTestsArray = ["all"];
const PreTest = ({ location }) => {
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const testType = searchParams.get("testType");
  const [tests, setTests] = useState([]);
  const { userState } = useContext(UserContext);
  useEffect(() => {
    if (userState?.groupCode) filterTestsArray.push(userState.groupCode);
  }, [userState]);

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
        if (testType) {
          setTests(result.filter((t) => t.type === testType || t.type === "custom"));
        } else {
          setTests(result);
        }
      })
      .catch((e) => console.log(e));
  }, [testType]);

  useEffect(() => {
    if (
      userState.isLoggedIn &&
      ["google", "facebook"].includes(userState.provider) &&
      !userState.parentNumber
    ) {
      history.push("/signup");
    }
  }, [userState, history]);
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
            tests
              ?.filter((test) => test.active)
              .map((test) => {
                const withSections = ["sat", "est"].includes(test.type);

                let finishedAttempts = 0;

                userState.testsTaken.forEach((t) => {
                  if (t.id === test.id) {
                    finishedAttempts += 1;
                  }
                });

                if (
                  test.attempts &&
                  test.attempts !== "unlimited" &&
                  finishedAttempts >= parseInt(test.attempts)
                ) {
                  return null;
                }
                const remainginAttempts =
                  test.attempts !== "unlimited"
                    ? parseInt(test.attempts) - finishedAttempts
                    : Infinity;
                return (
                  <Link to={`/test/${test.id}`} key={test.id} style={{ margin: "1rem 0" }}>
                    {test.name} -- {test.type.toUpperCase()} MATH
                    {withSections
                      ? ` --  2 Sections (${test.type === "sat" ? "25" : "20"}, 55) Mins`
                      : test.type === "act"
                      ? " -- 60 Mins"
                      : test.duration}
                    {test.attempts &&
                      test.attempts !== "unlimited" &&
                      `  -- ${remainginAttempts} attempt${
                        remainginAttempts === 1 ? "" : "s"
                      } remaining`}
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
