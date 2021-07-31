import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import Rating from "@material-ui/lab/Rating";
import Header from "../components/Header";
import Footer from "../components/Footer";
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getReviews = async () => {
      const snapshot = await firebase.firestore().collection("reviews").get();
      return snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    };
    getReviews()
      .then((result) => setReviews(result))
      .catch((e) => console.log(e));
  }, []);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header style={{ position: "static" }} />
      <div style={{ margin: "1rem" }}>
        {reviews.map(({ id, name, stars, text }) => {
          return (
            <div
              key={id}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                margin: "1rem 0",
              }}
            >
              <p>{text}</p>
              <h2>{name}</h2>
              <Rating name="rating" count={5} value={stars} disabled />
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Reviews;
