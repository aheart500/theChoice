import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import UserContext from "../../Contexts/User/UserContext";
import Loader from "../../components/Loader/Loader";
import firebase from "firebase/app";
import Question from "./Question";
import Footer from "./Footer";
import Score from "./Score";
import { useHistory } from "react-router-dom";
import MyDialog from "./Dialog";
const Test = ({ match: { params } }) => {
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [currentSection, setCurrentSection] = useState(1);
  const { userState, AddTest } = useContext(UserContext);
  const [finished, setFinished] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [review, setReview] = useState(false);
  const [dialog, setDialog] = useState({ open: false, type: "" });
  const history = useHistory();
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
          } else {
            setAccessDenied(true);
          }
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    }
  }, [params.id, userState.groupCode]);

  const withSections = ["sat", "est"].includes(test?.type);
  const sectionQuestions = withSections
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
    } else {
      handleEnd();
    }
  };
  const toggleHighlight = () => {
    const newQuestions = questions.map((q) =>
      q.number === currentQuestion ? { ...q, highlight: !q.highlight } : q
    );
    setQuestions(newQuestions);
  };
  const toggleFlag = () => {
    const newQuestions = questions.map((q) =>
      q.number === currentQuestion ? { ...q, flagged: !q.flagged } : q
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

  const correctQuestions = questions?.filter(
    (ques) => ques.userAnswer.toLowerCase() === ques.correctAnswer.toLowerCase()
  );
  useEffect(() => {
    if (review) {
      setCurrentSection(1);
      setCurrentQuestion(1);
    }
  }, [review]);
  useEffect(() => {
    setCurrentQuestion(1);
  }, [currentSection]);
  const saveTest = () => {
    const newTest = {
      id: test.id,
      score: correctQuestions.length,
      totalQuestions: questions.length,
      takenAt: Date.now(),
      name: test.name,
      type: test.type,
    };
    firebase
      .firestore()
      .collection("users")
      .doc(userState.uid)
      .update({
        testsTaken: firebase.firestore.FieldValue.arrayUnion(newTest),
      })
      .then(() => AddTest(newTest))
      .catch((e) => {
        console.log(e);
      });
  };
  const handleEnd = () => {
    if (review) {
      history.push("/myaccount");
      return;
    }
    if (withSections && currentSection === 1) {
      setDialog({ open: true, type: "section" });
    } else {
      setDialog({ open: true, type: "test" });
    }
  };
  const handleCloseDialog = () => setDialog({ open: false, type: "" });
  const handleNextSection = () => {
    handleCloseDialog();
    setCurrentSection(currentSection + 1);
  };
  const handleFinish = () => {
    handleCloseDialog();
    saveTest();
    setFinished(true);
  };

  const handleTimeFinish = () => {
    setTimeUp(true);
    handleEnd();
  };
  const handleAnswer = (n, ans) => {
    const newQuestions = questions.map((q) => (q.number === n ? { ...q, userAnswer: ans } : q));
    setQuestions(newQuestions);
  };

  if (loading) return <Loader />;
  if (accessDenied)
    return (
      <>
        <h1>Access Denied</h1>
        <p>You are not allowed to participate in this test</p>
      </>
    );
  if (finished && !review) {
    return (
      <Score
        questionsLength={questions.length}
        correctQuestionsLength={correctQuestions.length}
        setReview={setReview}
        timeUp={timeUp}
        testType={test.type}
      />
    );
  }
  if (!test.active) {
    return (
      <div className="flexCenter">
        <h1>This test isn't active right now</h1>
      </div>
    );
  }
  if (!review && userState.testsTaken && test.attempts && test.attempts !== "unlimited") {
    let finishedAttempts = 0;

    userState.testsTaken?.forEach((t) => {
      if (t.id === test.id) {
        finishedAttempts += 1;
      }
    });
    if (finishedAttempts >= parseInt(test.attempts)) {
      return (
        <div className="flexCenter">
          <h1>You can no longer take this test</h1>
        </div>
      );
    }
  }
  return (
    <div className="preTestContianer">
      <MyDialog
        {...dialog}
        handleEnd={handleFinish}
        handleClose={handleCloseDialog}
        handleNextSection={handleNextSection}
      />
      <Header
        handleNext={handleNext}
        handlePrev={handlePrev}
        toggleHighlight={toggleHighlight}
        highlight={sectionQuestions?.[currentQuestion - 1]?.highlight}
        time={time * 60}
        startTime={!review && currentQuestion !== null}
        handleEnd={handleEnd}
        handleTimeFinish={handleTimeFinish}
        section={currentSection}
        setCurrentSection={setCurrentSection}
        review={review}
        withSections={withSections}
      />
      <Question
        question={sectionQuestions?.[currentQuestion - 1]}
        review={review}
        setAnswer={handleAnswer}
        index={currentQuestion}
        currentSection={currentSection}
        testType={test.type}
      />
      <Footer
        questions={sectionQuestions}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        flagQuestion={toggleFlag}
        review={review}
      />
    </div>
  );
};

export default Test;
