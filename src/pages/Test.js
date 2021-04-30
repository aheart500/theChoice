import React, { useState, useEffect } from "react";
import Answers from "../components/Answers";
import TestNav from "../components/TestNav";
import TestNavFooter from "../components/TestNavFooter";
import { FaCalculator, FaBan } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import est from "../images/est.png";

import firebase from "firebase/app";
import "firebase/firestore";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import TimeDisplay from "../components/TimeDisplay";

function Test(props) {
  const history = useHistory();
  const [testStarted, setTestStarted] = useState(false);
  const name = props.history.location.name;
  const phone = props.history.location.phone;
  const [showReview, setShowReview] = useState(false);
  const [questions, setQuestions] = useState([]);
  const options = Array.from({ length: 58 }, (_, i) => i + 1);
  const studentData = firebase.firestore().collection("test1solutions").doc(name);

  const [wrongAnswers, setWrongAnswers] = useState([]);

  const getQuestions = async () => {
    const snapshot = await firebase.firestore().collection("test1").get();
    return snapshot.docs.map((doc) => doc.data());
  };
  useEffect(() => {
    getQuestions()
      .then((response) => setQuestions(response))
      .catch(() => console.log("error fetching questions"))
      .then(() => setTestStarted(true));
  }, []);
  console.log(questions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [checked, setChecked] = useState(null);
  const [scorable, setScorable] = useState(true);

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setScorable(true);
      setCurrentQuestion(nextQuestion);
      setChecked(false);
      setTimeout(() => {
        setChecked(null);
      }, 2000);
    } else {
    }
  };
  const handlePrev = () => {
    const nextQuestion = currentQuestion - 1;
    if (nextQuestion >= 0) {
      setScorable(true);
      setCurrentQuestion(nextQuestion);
      setCurrentQuestion(nextQuestion);
      setChecked(false);
      setTimeout(() => {
        setChecked(null);
      }, 1000);
    } else {
    }
  };

  const handleQuestionChange = (option) => {
    setCurrentQuestion(option.value - 1);
  };

  const handleAnswerSelection = (answer) => {
    if (scorable && answer === questions[currentQuestion].ans) {
      setScore((prevScore) => prevScore + 1);
      setScorable(false);
    } else {
      setWrongAnswers([...wrongAnswers, currentQuestion + 1]);
    }
  };

  const handleTestEnd = () => {
    studentData
      .set(
        {
          falseAnswers: wrongAnswers,
        },
        { merge: true }
      )
      .then(() => {
        history.push({
          pathname: "/",
        });
      });
  };

  return (
    <>
      <div className="header">
        <div className="section-indicator">
          {currentQuestion < 20 ? (
            <div>
              <div>
                <FaBan size="4em" className="ban" />
                <FaCalculator size="2em" className="calc" />
              </div>
            </div>
          ) : (
            <div>
              <FaCalculator size="3em" className="calc" />
            </div>
          )}
          <img src={est} width="100px" />
        </div>

        <div>
          <Dropdown
            options={options}
            onChange={handleQuestionChange}
            value={currentQuestion + 1}
            placeholder={currentQuestion + 1}
            arrowOpen={true}
          />
        </div>
        <TimeDisplay start={testStarted} />
        <button onClick={() => setShowScore(true)}>End</button>
      </div>
      <div className="testPage">
        {questions.length > 0 && (
          <div>
            <div className="question-section">
              <img src={questions[currentQuestion].img} alt="question" className="question-img" />
            </div>
            <div className="answers-section">
              {questions[currentQuestion].mcq ? (
                <>
                  <div className="answer">
                    <input
                      type="radio"
                      id={`a`}
                      name="answer"
                      onChange={() => handleAnswerSelection("a")}
                      checked={checked}
                    />
                    <label for="ans">A</label>
                  </div>
                  <div className="answer">
                    <input
                      type="radio"
                      id={`b`}
                      name="answer"
                      onChange={() => handleAnswerSelection("b")}
                      checked={checked}
                    />
                    <label for="ans">B</label>
                  </div>
                  <div className="answer">
                    <input
                      type="radio"
                      id={`c`}
                      name="answer"
                      onChange={() => handleAnswerSelection("c")}
                      checked={checked}
                    />
                    <label for="ans">C</label>
                  </div>
                  <div className="answer">
                    <input
                      type="radio"
                      id={`d`}
                      name="answer"
                      onChange={() => handleAnswerSelection("d")}
                      checked={checked}
                    />
                    <label for="ans">D</label>
                  </div>
                  <div className="answer">
                    <input
                      type="radio"
                      id={`e`}
                      name="answer"
                      onChange={() => handleAnswerSelection("e")}
                      checked={checked}
                    />
                    <label for="ans">E</label>
                  </div>
                </>
              ) : (
                <div className="answer">
                  <input
                    type="text"
                    id={`gridin`}
                    name="answer"
                    onChange={(value) =>
                      value === questions[currentQuestion].ans
                        ? setScore((prevScore) => prevScore + 1)
                        : null
                    }
                  />
                  <label for="ans">Type your answer here</label>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="footer">
        <button onClick={handlePrev} disabled={currentQuestion === 0 ? true : false}>
          Prev
        </button>
        <div className="counter">
          <p>Question</p>
          <h1>{currentQuestion + 1 + "/" + questions.length}</h1>
        </div>
        <button
          onClick={handleNext}
          disabled={currentQuestion === questions.length - 1 ? true : false}
        >
          Next
        </button>
      </div>

      {showScore && (
        <div className="score-panel">
          <h1>EST Practice Test</h1>
          <h2>Section: Math (No Calc + Calc)</h2>
          <h3>{`You Scored ${score} out of 58`}</h3>
          <div className="score-actions">
            <button onClick={() => setShowReview(true)}>Review</button>
            <button onClick={handleTestEnd}>Exit</button>
          </div>
          {showReview && (
            <div>
              <p>{`Questions that you answered incorrectly: ${wrongAnswers}`}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Test;
