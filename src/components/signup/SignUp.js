import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import clsx from "clsx";
import { signUpStyles } from "./SignMaterialStyle";
import PasswordInput from "../commons/password-input/PasswordInput";
import { Formik } from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

import { signUpUser } from '../../services/userService';
import * as yup from 'yup';

function SignUp(props) {
  const history = useHistory();
  const classes = signUpStyles();

  const [valuesPassword, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false
  });

  const redirectSignIn = () => {
    history.push("/");
  };

  const onSubmitForm = async (data) => {
    let response = await signUpUser(data);
    history.push("/");
  }

  const handleClickShowPassword = () => {
    setValues({ ...valuesPassword, showPassword: !valuesPassword.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required().label("FullName"),
    email: yup.string().required().label("Email"),
    password: yup.string().required().label("Password")
  });

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            onSubmit={data => {
              onSubmitForm(data);
            }}
            validationSchema = {validationSchema}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              errors
            }) => (
              <form
                onSubmit={handleSubmit}
                className={classes.form}
                autoComplete="off"
              >
                <FormControl className={clsx(classes.formControl)}>
                  <TextField
                    label="Full Name"
                    className={clsx(classes.input)}
                    id="margin-normal"
                    helperText="Put your name"
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={event => {
                      setFieldValue("name", event.target.value);
                    }}
                  />
                  {errors.name && <div className={classes.errorMessage}>{errors.name}</div>}
                </FormControl>
                <FormControl className={clsx(classes.formControl)}>
                  <TextField
                    label="Email"
                    className={clsx(classes.input)}
                    id="margin-normal"
                    helperText="Put your email"
                    margin="normal"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={event => {
                      setFieldValue("email", event.target.value);
                    }}
                  />
                  {errors.email && <div className={classes.errorMessage}>{errors.email}</div>}
                </FormControl>
                <FormControl className={clsx(classes.formControl)}>
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={valuesPassword.showPassword ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={event => {
                      setFieldValue("password", event.target.value);
                    }}
                    className={clsx(classes.input)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {valuesPassword.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errors.password && <div className={classes.errorMessage}>{errors.password}</div>}
                </FormControl>
                <Button
                  className={classes.buttonSubmit}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Create Account
                </Button>
              </form>
            )}
          </Formik>
          <Chip
            onClick={redirectSignIn}
            className={classes.chip}
            icon={<FaceIcon />}
            label="SignIn"
            clickable
            color="primary"
            deleteIcon={<DoneIcon />}
            variant="outlined"
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default SignUp;

SignUp.propTypes = {};
