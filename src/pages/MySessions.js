import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PreTest(props) {
  return (
    <div className="preTestContianer">
      <Header />
      <div className="pretest-content">
        <h1>Hi, Mohamed!</h1>
        <h3>You don't have any sessions available right now.</h3>
      </div>
      <Footer />
    </div>
  );
}
