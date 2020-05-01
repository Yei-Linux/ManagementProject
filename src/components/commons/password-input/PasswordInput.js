import React, { Fragment,useState } from "react";
import PropTypes from "prop-types";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import { blockStatement } from "@babel/types";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import clsx from "clsx";

function PasswordInput({ inputClass }) {
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false
  }); 

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
      <Input
        id="standard-adornment-password"
        type={values.showPassword ? "text" : "password"}
        value={values.password}
        onChange={handleChange("password")}
        className={clsx(inputClass)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </Fragment>
  );
}

export default PasswordInput;

PasswordInput.propTypes = {};
