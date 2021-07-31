import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import firebase from "firebase/app";
import "firebase/firestore";

import Carousel from "./Carousel";
import Services from "./Services";
import TestPreps from "./TestPreps";
import About from "./About";
import ReviewsSection from "./ReviewsSection";

export default function Home() {
  const user = firebase.auth().currentUser;

  return (
    <div className="homme">
      <Header user={user} />
      <div className="home-hero">
        <h1>
          The Golden Standard<br></br> of Math Tutoring
        </h1>
        <button>Learn More</button>
      </div>
      <TestPreps />
      <Services />
      <About />
      <Carousel />
      <ReviewsSection />
      <Footer />
    </div>
  );
}
