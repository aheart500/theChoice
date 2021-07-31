import React from "react";
import yehia from "../../images/dryehia2.JPG";
const About = () => {
  return (
    <div className="about" id="about">
      <h1>About Dr. Yehia Ibrahim</h1>
      <div className="about-inner">
        <img src={yehia} width="250px" alt="yehia" />
        <div className="about-desc">
          <p>
            Dr. Yehia is a professional Math tutor who has more than 6 years of experience. Hundreds
            of his students got perfect scores on their tests.
          </p>
          <p>
            Dr. Yehia is such a unique tutor because he himself was a student who took these tests
            before, so he actually knows what it takes for you to raise your score.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
