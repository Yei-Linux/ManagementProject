import React, { useState } from "react";
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
import { signInStyles } from "./SignMaterialStyle";
import PasswordInput from "../commons/password-input/PasswordInput";
import { useHistory } from "react-router-dom";


import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

import { Formik } from "formik";

import { authenticateUser } from "../../services/authenticationService";
import * as yup from 'yup';

function SignIn(props) {
  const history = useHistory();
  const classes = signInStyles();
  
  const [valuesPassword, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false
  });

  const redirectSignUp = () => {
    history.push("/signup");
  };

  const onSubmitForm = async data => {
    let response = await authenticateUser(data);
    localStorage.setItem("user_info",response.data.token);
    localStorage.setItem("user_id",response.data.id);
    localStorage.setItem("user_name",response.data.name);
    history.push("/home");
  };

  const handleClickShowPassword = () => {
    setValues({ ...valuesPassword, showPassword: !valuesPassword.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required().label("Email"),
    password: yup.string().required().label("Password")
  });
 
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={data => {
              onSubmitForm(data);
            }}
            validationSchema = {validationSchema}
          >
            {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, errors }) => (
              <form
                onSubmit={handleSubmit}
                className={classes.form}
                autoComplete="off"
              >
                <FormControl className={clsx(classes.formControl)}>
                  <TextField
                    label="User"
                    className={clsx(classes.input)}
                    id="margin-normal"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={event => {
                      setFieldValue("email", event.target.value);
                    }}
                    helperText="Put your email"
                    margin="normal"
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
                  SignIn
                </Button>
              </form>
            )}
          </Formik>

          <Chip
            onClick={redirectSignUp}
            className={classes.chip}
            icon={<FaceIcon />}
            label="SignUp"
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

export default SignIn;
