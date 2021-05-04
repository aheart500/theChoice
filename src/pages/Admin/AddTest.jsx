import React from "react";
import firebase from "firebase/app";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Collapse from "@material-ui/core/Collapse";
const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minWidth: "50%",
    width: "50%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    height: "100%",
  },
  input: {
    marginRight: "0.5rem",
    marginBottom: "1rem",
    height: "4rem",
  },
  button: {
    borderRadius: "20px",
    marginTop: "auto",
  },
  formControl: {
    minWidth: 130,
    marginBottom: "1rem",
    "& .MuiInputBase-input": {
      paddingLeft: "2px",
    },
  },
}));

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 4) {
    errors.name = "Must be 4 characters or more";
  }
  if (!values.type) {
    errors.type = "Required";
  }
  if (values.type === "custom" && !values.duration) {
    errors.duration = "Required";
  }
  return errors;
};
const AddTest = ({ addTest, open, onClose }) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      duration: "",
      availability: "all",
    },
    validate,
    onSubmit: (values) => {
      firebase
        .firestore()
        .collection("tests")
        .add({ ...values, questions: [], created: firebase.firestore.FieldValue.serverTimestamp() })
        .then((response) => {
          addTest({ ...values, id: response.id });
          formik.resetForm();
          onClose();
        });
    },
  });
  return (
    <Dialog onClose={onClose} open={open} PaperProps={{ className: classes.dialogPaper }}>
      <DialogTitle>Add Test</DialogTitle>
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

        <FormControl
          className={classes.formControl}
          error={formik.touched.type && formik.errors.type}
        >
          <InputLabel id="testType">Test Type</InputLabel>
          <Select labelId="testType" {...formik.getFieldProps("type")}>
            <MenuItem value={"act"}>ACT Math</MenuItem>
            <MenuItem value={"sat"}>SAT Math</MenuItem>
            <MenuItem value={"est"}>EST Math</MenuItem>
            <MenuItem value={"custom"}>Custom</MenuItem>
          </Select>
          <FormHelperText>{formik.touched.type && formik.errors.type}</FormHelperText>
        </FormControl>
        <Collapse in={formik.values.type === "custom"}>
          <TextField
            className={classes.input}
            id="duration"
            label="Test Duration"
            type="number"
            fullWidth
            error={formik.touched.duration && !!formik.errors.duration}
            helperText={formik.touched.duration && formik.errors.duration}
            {...formik.getFieldProps("duration")}
          />
        </Collapse>
        <TextField
          className={classes.input}
          id="availability"
          label="Test Availability"
          type="text"
          fullWidth
          error={formik.touched.availability && !!formik.errors.availability}
          helperText={formik.touched.availability && formik.errors.availability}
          {...formik.getFieldProps("availability")}
        />
        <Button className={classes.button} color="primary" type="submit" variant="contained">
          Add test
        </Button>
      </form>
    </Dialog>
  );
};

export default AddTest;
