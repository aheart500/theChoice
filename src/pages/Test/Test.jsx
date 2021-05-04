import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import UserContext from "../../Contexts/User/UserContext";
import Loader from "../../components/Loader/Loader";
import firebase from "firebase/app";
import Question from "./Question";
const Test = ({ match: { params } }) => {
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentSection, setCurrentSection] = useState(1);
  const { userState } = useContext(UserContext);

  useEffect(() => {
    if (params.id) {
      firebase
        .firestore()
        .collection("tests")
        .doc(params.id)
        .get()
        .then((response) => {
          const testData = response.data();
          if (testData.availability === "all" || testData.availability === userState.groupCode) {
            setTest({ id: response.id, ...testData });
            const qs = testData.questions
              .sort((a, b) => a.section - b.section)
              .map((q, i) => ({
                ...q,
                number: i + 1,
                userAnswer: "",
                highlight: false,
                flagged: false,
              }));
            setQuestions(qs);
            setCurrentQuestion(qs?.[0]);
          } else {
            setAccessDenied(true);
          }
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    }
  }, [params.id, userState.groupCode]);
  console.log(questions);
  /* let nOfQuestions = 0
  let questions = []
  if(test){
    questions = ['sat', 'est'].includes(test.type) ? test.questions?.filter(ques => ques.section === '' + currentSection) : test.questions
    nOfQuestions = questions.length
  } */
  const sectionQuestions = ["sat", "est"].includes(test?.type)
    ? questions?.filter((ques) => ques.section === "" + currentSection)
    : questions;
  const handlePrev = () => {
    if (currentQuestion !== 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  const handleNext = () => {
    if (currentQuestion !== sectionQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const toggleHighlight = () => {
    const newQuestions = questions.map((q) =>
      q.number === currentQuestion.number ? { ...q, highlight: !q.highlight } : q
    );
    setQuestions(newQuestions);
  };
  const time =
    test?.type === "act"
      ? 60
      : test?.type === "sat"
      ? currentSection === 1
        ? 25
        : 55
      : test?.type === "est"
      ? currentSection === 1
        ? 30
        : 55
      : test?.duration
      ? test?.duration
      : 0;
  const handleEnd = () => {
    console.log("end");
  };
  const handleTimeFinish = () => {
    console.log("timeFinish");
  };
  if (loading) return <Loader />;
  if (accessDenied)
    return (
      <>
        <h1>Access Denied</h1>
        <p>You are not allowed to participate in this test</p>
      </>
    );
  console.log(currentQuestion, "s");
  return (
    <div>
      <Header
        handleNext={handleNext}
        handlePrev={handlePrev}
        toggleHighlight={toggleHighlight}
        highlight={currentQuestion?.highlight}
        time={time * 60}
        startTime={currentQuestion !== null}
        handleEnd={handleEnd}
        handleTimeFinish={handleTimeFinish}
      />
      <Question question={currentQuestion} />
    </div>
  );
};

export default Test;
