import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
const useStyle = makeStyles(() => ({
  dialogPaper: {
    width: "70%",
    maxWidth: "70%",
  },
  root: {
    display: "flex",
    padding: 20,
  },
  fileUpload: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
  },
  image: {
    maxWidth: "95%",
    height: "20rem",
    marginTop: 2,
  },
  formControl: {
    minWidth: 130,
    marginBottom: "1rem",
    "& .MuiInputBase-input": {
      paddingLeft: "2px",
    },
  },
  formFields: {
    display: "flex",
    flexDirection: "column",
    width: "25%",
  },
  correctAnswer: {
    height: "3rem",
  },
  button: {
    borderRadius: "20px",
    marginTop: "2rem",
  },
}));
const AddQuestion = ({ addQuestion, open, onClose, withSections }) => {
  const classes = useStyle();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [questionType, setQuestionType] = useState("");
  const [questionSection, setQuestionSection] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const handleFileUpload = (e) => {
    if (e.target.files) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleChangeQuestionType = (e) => {
    setQuestionType(e.target.value);
    setCorrectAnswer("");
  };
  const handleChangeAnswer = (e) => {
    setCorrectAnswer(e.target.value);
  };
  const handleChangeQuestionSection = (e) => {
    setQuestionSection(e.target.value);
  };

  const isValid =
    uploadedFile && questionType && correctAnswer && (withSections ? questionSection !== "" : true);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    setUploading(true);
    const storageRef = firebase
      .storage()
      .ref()
      .child("images/" + Date.now());
    storageRef
      .put(uploadedFile)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          addQuestion({ image: url, type: questionType, correctAnswer, section: questionSection });
          setUploadedFile(null);
          setQuestionType("");
          setCorrectAnswer("");
          setQuestionSection("");
          fileRef.current.value = "";
          setUploading(false);
          onClose();
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <Dialog onClose={onClose} open={open} PaperProps={{ className: classes.dialogPaper }}>
      <DialogTitle>Add Question</DialogTitle>

      <form className={classes.root} onSubmit={handleFormSubmit}>
        <div className={classes.fileUpload}>
          <input ref={fileRef} type="file" id="file" accept="image/*" onChange={handleFileUpload} />
          {uploadedFile && (
            <img
              className={classes.image}
              src={URL.createObjectURL(uploadedFile)}
              alt="uploaded file"
            />
          )}
        </div>
        <div className={classes.formFields}>
          {withSections && (
            <FormControl className={classes.formControl}>
              <InputLabel id="questionSection">Question Section</InputLabel>
              <Select
                labelId="questionSection"
                value={questionSection}
                onChange={handleChangeQuestionSection}
              >
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
              </Select>
            </FormControl>
          )}
          <FormControl className={classes.formControl}>
            <InputLabel id="questionType">Question Type</InputLabel>
            <Select labelId="questionType" value={questionType} onChange={handleChangeQuestionType}>
              <MenuItem value={"mcq"}>MCQ</MenuItem>
              <MenuItem value={"shortAnswer"}>Short Answer</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.correctAnswer}>
            {questionType === "mcq" ? (
              <FormControl component="fieldset">
                <FormLabel component="legend">Correct Answer</FormLabel>
                <RadioGroup row name="ans" value={correctAnswer} onChange={handleChangeAnswer}>
                  <FormControlLabel value="a" control={<Radio />} label="A" />
                  <FormControlLabel value="b" control={<Radio />} label="B" />
                  <FormControlLabel value="c" control={<Radio />} label="C" />
                  <FormControlLabel value="d" control={<Radio />} label="D" />
                  <FormControlLabel value="e" control={<Radio />} label="E" />
                </RadioGroup>
              </FormControl>
            ) : questionType === "shortAnswer" ? (
              <div>
                <TextField
                  fullWidth
                  label="Correct Answer"
                  value={correctAnswer}
                  onChange={handleChangeAnswer}
                />
              </div>
            ) : null}
          </div>
          <Button
            className={classes.button}
            disabled={!isValid || uploading}
            color="primary"
            type="submit"
            variant="contained"
          >
            {uploading ? "Saving..." : "Add Question"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default AddQuestion;
