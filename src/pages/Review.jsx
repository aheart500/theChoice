import React, { useContext, useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UserContext from "../Contexts/User/UserContext";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
const useStyle = makeStyles({
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "10rem 0",
  },
  text: {
    border: "1px solid gray",
    borderRadius: "15px",
    width: "30rem",
    margin: "1rem 0",
    padding: "5px",
  },
});
const Review = () => {
  const classes = useStyle();
  const history = useHistory();
  const { userState: user } = useContext(UserContext);
  const [studentReview, setStudentReview] = useState({ stars: 0, text: "" });
  const [edit, setEdit] = useState(false);
  const reviewRef = firebase.firestore().collection("reviews").where("student", "==", user?.uid);

  useEffect(() => {
    if (user.isLoggedIn) {
      reviewRef
        .get()
        .then((response) => {
          const reviews = response.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });

          if (reviews.length > 0) {
            setStudentReview(reviews[0]);
            setEdit(true);
          }
        })
        .catch((e) => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLoggedIn]);
  const ratingChanged = (_, stars) => {
    setStudentReview({ ...studentReview, stars });
  };
  const handleChange = (e) => setStudentReview({ ...studentReview, text: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      firebase
        .firestore()
        .collection("reviews")
        .doc(studentReview.id)
        .update({ stars: studentReview.stars, text: studentReview.text })
        .then(() => {
          history.push("/");
        });
    } else {
      firebase
        .firestore()
        .collection("reviews")
        .add({ ...studentReview, student: user.uid, name: user.name || "" })
        .then(() => {
          history.push("/");
        });
    }
  };
  if (!user.isLoggedIn) return null;
  return (
    <div>
      <Header style={{ position: "static" }} />
      <form onSubmit={handleSubmit} className={classes.form}>
        <h2>{user?.name}</h2>
        <Rating name="rating" count={5} value={studentReview.stars} onChange={ratingChanged} />
        <TextField
          value={studentReview.text}
          multiline
          rows={5}
          placeholder="Write your review..."
          onChange={handleChange}
          className={classes.text}
          InputProps={{ disableUnderline: true }}
        />
        <Button type="submit" variant="outlined" color="primary">
          {edit ? "Edit" : "Save"} Review
        </Button>
      </form>
      <Footer />
    </div>
  );
};

export default Review;
