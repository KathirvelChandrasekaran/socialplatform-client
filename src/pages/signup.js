import React, { useState } from "react";
import Proptype from "prop-types";

import axios from "axios";
import { toast } from "react-toastify";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import logo from "../images/logo.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  form: {
    textAlign: "center",
  },
  image: {
    height: 70,
    width: 70,
    margin: 10,
  },
  fields: {
    marginTop: 10,
  },
  small: {
    marginTop: 30,
  },
}));

const Signup = (props) => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      handle: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      handle: yup
        .string()
        .strict()
        .trim()
        .required("Name is required")
        .max(15, "Maximum 15 character is required")
        .min(5, "Minimum 5 character required"),
      email: yup
        .string(0)
        .email()
        .required("Email is required")
        .strict()
        .trim(),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Minimum of 6 length"),
      confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .min(6, "Minimum of 6 length")
        .oneOf([yup.ref("password"), null], "Both must be same"),
    }),
    onSubmit: (userInputData) => {
      console.log(userInputData);
      axios
        .post("/signup", userInputData)
        .then((res) => {
          localStorage.setItem("FireToken", `Bearer ${res.data.token}`);
          toast.success("Signup Success!!!", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          props.history.push("/");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.error, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          //   console.log(err.response.data);
        });
    },
  });
  return (
    <div>
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img className={classes.image} src={logo} alt="Logo"></img>
          <Typography variant="h4" className={classes.pageTitle}>
            Signup
          </Typography>
          <form
            noValidate
            className={classes.fields}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              autoComplete="off"
              className={classes.fields}
              type="text"
              name="handle"
              onChange={formik.handleChange}
              value={formik.values.handle}
              label="User Handle"
              error={formik.errors.handle == null ? false : true}
              helperText={formik.errors.handle}
              fullWidth
            ></TextField>
            <TextField
              autoComplete="off"
              className={classes.fields}
              type="text"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              label="Email"
              error={formik.errors.email == null ? false : true}
              helperText={formik.errors.email}
              fullWidth
            ></TextField>
            <TextField
              className={classes.fields}
              autoComplete="off"
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              label="Password"
              error={formik.errors.password == null ? false : true}
              helperText={formik.errors.password}
              fullWidth
            ></TextField>
            <TextField
              className={classes.fields}
              autoComplete="off"
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              label="Confirm Password"
              error={formik.errors.confirmPassword == null ? false : true}
              helperText={formik.errors.confirmPassword}
              fullWidth
            ></TextField>

            <Button
              className={classes.fields}
              variant="contained"
              color="primary"
              type="submit"
              name="action"
              onClick={() => setLoading(true)}
            >
              Signup
            </Button>
          </form>
          <div className={classes.fields}>
            {loading ? <CircularProgress /> : null}
          </div>
          <div className={classes.small}>
            <small>
              Already have an account? Then <Link to="/login">Login!!!</Link>
            </small>
          </div>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    </div>
  );
};

Signup.prototype = {
  classes: Proptype.object.isRequired,
};

export default Signup;
