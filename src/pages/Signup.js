import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserContext from "../Contexts/User/UserContext";
import { useFormik } from "formik";
import firebase from "firebase/app";
import "firebase/auth";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import GTranslateIcon from "@material-ui/icons/GTranslate";

const useStyles = makeStyles((theme) => ({
  input: {
    margin: "1rem 0",
    width: "70%",
  },
}));
const FBProvider = new firebase.auth.FacebookAuthProvider();
const GoogleProvider = new firebase.auth.GoogleAuthProvider();
const validate = (values, withoutPassword) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 4) {
    errors.name = "Must be 4 characters or more";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (values.email.length < 8) {
    errors.name = "Must be 8 characters or more";
  }
  if (!values.phone) {
    errors.phone = "Required";
  } else if (values.phone.length < 8) {
    errors.phone = "Must be 8 characters or more";
  }
  if (!values.parentName) {
    errors.parentName = "Required";
  }
  if (!values.parentNumber) {
    errors.parentNumber = "Required";
  } else if (values.parentNumber.length < 8) {
    errors.parentNumber = "Must be 8 characters or more";
  }
  if (!withoutPassword) {
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Must be 8 characters or more";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    } else if (values.confirmPassword.length < 8) {
      errors.confirmPassword = "Must be 8 characters or more";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Doesn't match password";
    }
  }

  return errors;
};

const Signup = ({ edit }) => {
  const classes = useStyles();
  const history = useHistory();
  const { Register, userState, UpdateUser } = useContext(UserContext);

  let initialValues = {
    name: "",
    phone: "",
    grade: "",
    email: "",
    sat: "",
    act: "",
    est: "",
    password: "",
    confirmPassword: "",
    groupCode: "",
    parentName: "",
    parentNumber: "",
  };

  const thirdLogin =
    userState.email && userState.isLoggedIn && ["facebook", "google"].includes(userState.provider)
      ? true
      : false;

  if (thirdLogin || edit) {
    delete initialValues.password;
    delete initialValues.confirmPassword;
    const valuesToTakeFromState = { ...userState };
    delete valuesToTakeFromState.isLoggedIn;
    delete valuesToTakeFromState.uid;
    delete valuesToTakeFromState.provider;
    initialValues = { ...initialValues, ...valuesToTakeFromState };
  }
  const formik = useFormik({
    initialValues,
    validate: (values) => validate(values, edit ? true : thirdLogin),
    onSubmit: (values) => {
      const valuesToSend = { ...values };
      delete valuesToSend.email;
      if (!thirdLogin & !edit) {
        Register({ username: values.email, ...valuesToSend })
          .then(() => history.replace("/"))
          .catch((e) => console.log(e));
      } else {
        delete valuesToSend.password;
        delete valuesToSend.confirmPassword;
        UpdateUser(userState.uid, { ...valuesToSend })
          .then(() => history.replace(edit ? "/myaccount" : "/"))
          .catch((e) => console.log(e));
      }
    },
  });
  const handleSignUpWithFacebook = () => {
    firebase
      .auth()
      .signInWithPopup(FBProvider)
      .then(({ user }) => {
        formik.setFieldValue("name", user.displayName);
        formik.setFieldValue("email", user.email);
      })
      .catch((e) => console.log(e));
  };
  const handleSignUpWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(GoogleProvider)
      .then(({ user }) => {
        formik.setFieldValue("name", user.displayName);
        formik.setFieldValue("email", user.email);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Header />
      <div className="signup-form">
        <h1 style={{ marginTop: "100px" }}>
          Please fill in your information to{" "}
          {edit
            ? "edit your account"
            : thirdLogin
            ? "be able to use your account"
            : "create an account!"}
        </h1>
        {!edit && (
          <>
            {" "}
            <h2 style={{ marginBottom: "0px" }}>Already have an account?</h2>{" "}
            <Link to="/signin">Click here to log in</Link>
          </>
        )}

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <form style={{ width: "80%" }} onSubmit={formik.handleSubmit}>
            <TextField
              id="name"
              label="Name"
              type="text"
              className={classes.input}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
              {...formik.getFieldProps("name")}
            />
            <TextField
              id="phone"
              label="Phone"
              type="text"
              className={classes.input}
              error={formik.touched.phone && !!formik.errors.phone}
              helperText={formik.touched.phone && formik.errors.phone}
              {...formik.getFieldProps("phone")}
            />
            <TextField
              id="grade"
              label="Grade"
              type="text"
              className={classes.input}
              error={formik.touched.grade && !!formik.errors.grade}
              helperText={formik.touched.grade && formik.errors.grade}
              {...formik.getFieldProps("grade")}
            />
            <TextField
              id="email"
              label="Email"
              type="text"
              className={classes.input}
              disabled={thirdLogin}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              {...formik.getFieldProps("email")}
            />
            <TextField
              id="sat"
              label="What's your highest SAT score?"
              type="number"
              className={classes.input}
              error={formik.touched.sat && !!formik.errors.sat}
              helperText={formik.touched.sat && formik.errors.sat}
              {...formik.getFieldProps("sat")}
            />
            <TextField
              id="act"
              label="What's your highest ACT score?"
              type="number"
              className={classes.input}
              error={formik.touched.act && !!formik.errors.act}
              helperText={formik.touched.act && formik.errors.act}
              {...formik.getFieldProps("act")}
            />
            <TextField
              id="est"
              label="What's your highest EST score?"
              type="number"
              className={classes.input}
              error={formik.touched.est && !!formik.errors.est}
              helperText={formik.touched.est && formik.errors.est}
              {...formik.getFieldProps("est")}
            />
            {!thirdLogin && !edit && (
              <>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  className={classes.input}
                  error={formik.touched.password && !!formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                  {...formik.getFieldProps("password")}
                />
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  className={classes.input}
                  error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  {...formik.getFieldProps("confirmPassword")}
                />
              </>
            )}
            <TextField
              id="groupCode"
              label="Group Code"
              type="text"
              className={classes.input}
              error={formik.touched.groupCode && !!formik.errors.groupCode}
              helperText={formik.touched.groupCode && formik.errors.groupCode}
              {...formik.getFieldProps("groupCode")}
            />
            <TextField
              id="parentName"
              label="Parent Name"
              type="text"
              className={classes.input}
              error={formik.touched.parentName && !!formik.errors.parentName}
              helperText={formik.touched.parentName && formik.errors.parentName}
              {...formik.getFieldProps("parentName")}
            />
            <TextField
              id="parentNumber"
              label="Parent Number"
              type="text"
              className={classes.input}
              error={formik.touched.parentNumber && !!formik.errors.parentNumber}
              helperText={formik.touched.parentNumber && formik.errors.parentNumber}
              {...formik.getFieldProps("parentNumber")}
            />
            <Button variant="contained" color="primary" className={classes.input} type="submit">
              {thirdLogin || edit ? "Update Data" : "Create User"}{" "}
            </Button>
          </form>
          {!edit && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button
                variant="contained"
                startIcon={<FacebookIcon />}
                style={{
                  backgroundColor: "lightblue",
                  margin: "1rem 0",
                }}
                onClick={handleSignUpWithFacebook}
              >
                Sign Up with facebook
              </Button>
              <Button
                variant="contained"
                startIcon={<GTranslateIcon />}
                style={{
                  backgroundColor: "lightgreen",
                }}
                onClick={handleSignUpWithGoogle}
              >
                Sign Up with google
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Signup;
