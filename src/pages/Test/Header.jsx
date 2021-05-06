import React from "react";
import { Link } from "react-router-dom";
import minilogo from "../../images/mini-logo.png";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import DeleteIcon from "@material-ui/icons/Delete";
import TimeDisplay from "../../components/TimeDisplay";
const useStyle = makeStyles({
  root: {
    backgroundColor: "#353577",
    width: "100%",
    height: "5rem",
    display: "flex",
    alignItems: "center",
  },
  navigationButtons: {
    marginLeft: "5rem",
  },
  controlButtons: {
    marginLeft: "auto",
    marginRight: "2rem",
    display: "flex",
    alignItems: "center",
  },
  btn: {
    height: "2.5rem",
    margin: "0 0.3rem",
  },
  wideButton: {
    width: "10rem",
  },
  highlighted: {
    backgroundColor: "gray",
  },
  notHighlighted: {
    backgroundColor: "white",
  },
  sectionsBox: {
    display: "flex",
    marginLeft: "3rem",
    alignItems: "center",
    color: "white",
  },
  sectionBtn: {
    marginLeft: "1rem",
  },
});
const Header = ({
  handlePrev,
  handleNext,
  toggleHighlight,
  highlight,
  handleEnd,
  time,
  startTime,
  handleTimeFinish,
  section,
  setCurrentSection,
  review,
  withSections,
}) => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Link to="/">
        <img src={minilogo} width="70px" alt="logo" />
      </Link>
      <div className={classes.navigationButtons}>
        <Button className={classes.btn} variant="contained" onClick={handlePrev}>
          Prev
        </Button>
        <Button className={classes.btn} variant="contained" onClick={handleNext}>
          Next
        </Button>
      </div>
      <div className={classes.sectionsBox}>
        <h3>Section {section}</h3>
        {review && withSections && (
          <Button
            className={classes.sectionBtn}
            variant="contained"
            onClick={() => setCurrentSection(section === 1 ? 2 : 1)}
          >
            {section === 1 ? 2 : 1}
          </Button>
        )}
      </div>
      <div className={classes.controlButtons}>
        <Button
          onClick={toggleHighlight}
          className={clsx(
            classes.btn,
            classes.wideButton,
            highlight ? classes.highlighted : classes.notHighlighted
          )}
          variant="contained"
        >
          {highlight ? "Clear" : "Add"} Highlight
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          className={clsx(classes.btn, classes.wideButton)}
          variant="contained"
          onClick={handleEnd}
        >
          End {review ? "Review" : "Section"}
        </Button>
        <TimeDisplay start={startTime} time={time} handleFinish={handleTimeFinish} />
      </div>
    </div>
  );
};

export default Header;
