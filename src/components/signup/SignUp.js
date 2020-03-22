import React from "react";
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

function SignUp(props) {
  const history = useHistory();
  const classes = signUpStyles();

  const redirectSignIn = () => {
    history.push("/");
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <form className={classes.form} noValidate autoComplete="off">
            <FormControl className={clsx(classes.formControl)}>
              <TextField
                label="Full Name"
                className={clsx(classes.input)}
                id="margin-normal"
                helperText="Put your fullname"
                margin="normal"
              />
            </FormControl>
            <FormControl className={clsx(classes.formControl)}>
              <TextField
                label="Email"
                className={clsx(classes.input)}
                id="margin-normal"
                helperText="Put your email"
                margin="normal"
              />
            </FormControl>
            <FormControl className={clsx(classes.formControl)}>
              <PasswordInput inputClass={classes.input} />
            </FormControl>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
            >
              Create Account
            </Button>
          </form>
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
