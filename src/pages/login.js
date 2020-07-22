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
    marginTop: 30,
  },
  small: {
    marginTop: 40,
  },
}));

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
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
    }),
    onSubmit: (userInputData) => {
      axios
        .post("/login", userInputData)
        .then((res) => {
          localStorage.setItem("FireToken", `Bearer ${res.data.token}`);
          toast.success("Login Success!!!", {
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
            Login
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
            <Button
              className={classes.fields}
              variant="contained"
              color="primary"
              type="submit"
              name="action"
              onClick={() => setLoading(true)}
            >
              Login
            </Button>
          </form>
          <div className={classes.fields}>
            {loading ? <CircularProgress /> : null}
          </div>
          <div className={classes.small}>
            <small>
              Dont have an account? Then <Link to="/signup">Signup!!!</Link>
            </small>
          </div>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    </div>
  );
};

Login.prototype = {
  classes: Proptype.object.isRequired,
};

export default Login;
