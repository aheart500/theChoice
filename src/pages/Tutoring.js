import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import YouTube from "@u-wave/react-youtube";

export default function Tutoring() {
  return (
    <>
      <Header />
      <div className="tutoring">
        <h1>Here's a sample of of our Tutoring Sessions</h1>
        <YouTube video="LPFvTHnb3ug" autoplay className="player" />
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSc7pKXGpUShqQFVR7PZ2OMIUDdE9OAgv1s-X8KUyH6SORJ1qw/viewform?usp=sf_link">
          Register Now!
        </a>
      </div>
      <Footer />
    </>
  );
}
