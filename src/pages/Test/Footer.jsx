import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { usePagination } from "@material-ui/lab/Pagination";
import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "auto",
    width: "100%",
    minHeight: "5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
    backgroundColor: "#353577",
  },
  paginationItem: {
    backgroundColor: "white",
    color: "black",
    margin: "0 0.1rem",
    border: "1px solid gray",
    width: "30px!important",
    minWidth: "30px",
    borderTop: "0",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
  selected: {
    border: "1px solid yellow",
  },
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  iconButton: {
    marginTop: "1.5rem",
  },
  flagBox: {
    height: "1.5rem",
    width: "30px",
    border: "1px solid gray",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottom: "0",
    margin: "0 auto -1px auto",
    textAlign: "center",
    backgroundColor: "white",
  },
  flagBoxEmpty: {
    backgroundColor: "transparent",
    border: 0,
  },

  flagButton: {
    marginTop: "1.5rem",
  },
  answered: {
    backgroundColor: "gray!important",
  },
  highlighted: {
    backgroundColor: "yellow!important",
    color: "black!important",
  },
  correctAnswer: {
    backgroundColor: "lightgreen!important",
    color: "black!important",
  },
  wrongAnswer: {
    backgroundColor: "red!important",
    color: "white!important",
  },
}));

const Footer = ({ questions, currentQuestion, setCurrentQuestion, flagQuestion, review }) => {
  const classes = useStyles();

  const handleChange = (ev, value) => {
    setCurrentQuestion(value);
  };
  const { items } = usePagination({
    count: questions.length,
    boundaryCount: 4,
    siblingCount: 10,
    page: currentQuestion,
    onChange: handleChange,
  });
  return (
    <div className={classes.root}>
      <ul className={classes.ul}>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "  ";
          } else if (type === "page") {
            const ques = questions[index - 1];
            const correctAnswer =
              ques.userAnswer.toLowerCase() === ques.correctAnswer.toLowerCase();
            children = (
              <div>
                <div className={clsx(classes.flagBox, !ques?.flagged && classes.flagBoxEmpty)}>
                  {ques?.flagged ? <FlagOutlinedIcon /> : ""}
                </div>
                <Button
                  {...item}
                  className={clsx(
                    classes.paginationItem,
                    ques.userAnswer !== "" && classes.answered,
                    ques?.highlight && classes.highlighted,
                    selected && classes.selected,
                    review && correctAnswer && classes.correctAnswer,
                    review && !correctAnswer && classes.wrongAnswer
                  )}
                >
                  {page}
                </Button>
              </div>
            );
          } else {
            children = (
              <Button className={clsx(classes.paginationItem, classes.iconButton)} {...item}>
                {type === "next" ? <NavigateNextIcon /> : <NavigateBeforeIcon />}
              </Button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </ul>
      <Button
        startIcon={<FlagOutlinedIcon />}
        className={classes.flagButton}
        onClick={flagQuestion}
        variant="contained"
        disabled={review}
      >
        Flag{" "}
      </Button>
    </div>
  );
};

export default Footer;
