import React from "react";
import { Link } from "react-router-dom";
const Services = () => {
  return (
    <div className="ourservices" id="services">
      <h1>Our Services</h1>
      <div className="services">
        <div className="service">
          <h1>Tutoring</h1>
          <p>
            We offer top notch tutoring programs. Lessons can be offered privately or in a group.
            Also, we have both delivery modes: Online and In-Person.
          </p>
          <Link to="./tutoring">
            <button>Try For Free</button>
          </Link>
        </div>
        <div className="service">
          <h1>Practice Resources</h1>
          <p>
            Access our online question bank which contains more than 5000 practice test questions.
            Our online learning platform allows us to track your progress and improvemnt and know
            which points you need to work on in order to raise your score.
          </p>
          <Link to="./pretest">
            <button> Try For Free</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
