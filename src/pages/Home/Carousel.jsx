import React from "react";
import lina from "../../images/testimonials/Lina.jpeg";
import farida from "../../images/testimonials/farida.jpeg";
import abdelrahman from "../../images/testimonials/abdelrahman.jpeg";
import retaj from "../../images/testimonials/retag.jpeg";
import nourine from "../../images/testimonials/Nourine.jpeg";
import farah from "../../images/testimonials/Farah.jpeg";
import abdelrahman1 from "../../images/testimonials/abdelrahman1.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import TestimonialCard from "material-testimonial-card";
import "reactjs-popup/dist/index.css";
const settings = {
  dots: true,
  centerMode: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
  focusOnSelect: true,
  lazyLoad: "ondemand",
  className: "testmonial",
  centerPadding: "20px",
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        focusOnSelect: true,
        centerMode: true,
        infinite: true,
        speed: 500,
        centerPadding: "20px",
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        focusOnSelect: true,
        centerMode: true,
        infinite: true,
        speed: 500,
        centerPadding: "20px",
      },
    },
  ],
};
const Carousel = () => {
  return (
    <div className="testimonials" id="testimonials">
      <h1>Testimonials</h1>
      <p className="testimonials-desc">
        Dr. Yehia provides the best math tutoring out there. But don't take our word for it. Read
        what some of his students has to say about him!
      </p>
      <Slider {...settings} className="slider">
        <div>
          <TestimonialCard
            name={"Lina"}
            image={lina}
            content={
              "Dr. Yehia's math course is basically the best! It includes everything for someone who wants to reach the highest scores in math. Dr. Yehia himself is very good at teaching. He makes everything a lot easier, and has very good patience and communication skills."
            }
            project={""}
          />{" "}
        </div>
        <div>
          <TestimonialCard
            name={"Farida"}
            image={farida}
            content={
              "Thank you for being a truly outstanding  teacher. Your passion for teaching and your dedication to your students is obvious in everything you do. I feel so lucky to have been put into your class. I hope you know the priceless impact you are making in so many lives."
            }
            project={""}
          />{" "}
        </div>
        <div>
          <TestimonialCard
            name={"Abdelrahman"}
            image={abdelrahman}
            content={
              "The course that Dr. Yehia offers actually includes everything any student needs to achieve what he/she wants in addition to the fact that it is perfectly organized (either in-person or online)"
            }
            project={""}
          />{" "}
        </div>
        <div>
          <TestimonialCard
            name={"Retaj"}
            image={retaj}
            content={
              "I enrolled at Dr. Yehia's course after I heard from my friends he was an excellent teacher. Turns out, they were lying: he is more than just excellent!"
            }
            project={""}
          />{" "}
        </div>
        <div>
          <TestimonialCard
            name={"Nourine"}
            image={nourine}
            content={
              "Your course is perfect. We cover all the lessons , tips and tricks that are found in  SAT & ACT tests in addition to solving a lot of tests and learning from the mistakes you explain."
            }
            project={""}
          />{" "}
        </div>
        <div>
          <TestimonialCard
            name={"Farah"}
            image={farah}
            content={
              "Dr. Yehia is one of the best teacher I've ever had. I used to have a hard time understanding math concepts, but now dr. Yehia made everything easier for me."
            }
            project={""}
          />{" "}
        </div>
        <div>
          <TestimonialCard
            name={"Abdelrahman"}
            image={abdelrahman1}
            content={"Dr. Yehia"}
            project={""}
          />{" "}
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
