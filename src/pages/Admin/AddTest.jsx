import React from "react";
import firebase from "firebase/app";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginRight: "0.5rem",
    marginBottom: "1rem",
    height: "4rem",
  },
  button: {
    borderRadius: "20px",
    marginLeft: "1rem",
  },
}));

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 4) {
    errors.name = "Must be 4 characters or more";
  }
  return errors;
};
const AddTest = ({ addTest }) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: "",
      duration: 60,
    },
    validate,
    onSubmit: (values) => {
      firebase
        .firestore()
        .collection("tests")
        .add({ ...values, questions: [], created: firebase.firestore.FieldValue.serverTimestamp() })
        .then((response) => {
          addTest({ ...values, id: response.id });
        });
    },
  });
  return (
    <div>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          className={classes.input}
          id="name"
          label="Test Name"
          type="text"
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
          {...formik.getFieldProps("name")}
        />
        <TextField
          className={classes.input}
          id="duration"
          label="Test Duration"
          type="number"
          error={formik.touched.duration && !!formik.errors.duration}
          helperText={formik.touched.duration && formik.errors.duration}
          {...formik.getFieldProps("duration")}
        />
        <Button className={classes.button} color="primary" type="submit" variant="contained">
          Add test
        </Button>
      </form>
    </div>
  );
};

export default AddTest;
