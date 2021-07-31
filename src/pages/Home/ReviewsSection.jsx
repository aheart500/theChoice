import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getReviews = async () => {
      const snapshot = await firebase.firestore().collection("reviews").limit(5).get();
      return snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    };
    getReviews()
      .then((result) => setReviews(result))
      .catch((e) => console.log(e));
  }, []);
  console.log(reviews);
  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "90%",
          margin: "1rem auto",
        }}
      >
        {reviews.map(({ id, name, stars, text }) => {
          return (
            <div
              key={id}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "25%",
              }}
            >
              <p>{text}</p>
              <h2>{name}</h2>
              <Rating name="rating" count={5} value={stars} disabled />
            </div>
          );
        })}
      </div>
      <Link to="/reviews" style={{ textAlign: "center", display: "block" }}>
        Show more..
      </Link>
    </div>
  );
};

export default ReviewsSection;
