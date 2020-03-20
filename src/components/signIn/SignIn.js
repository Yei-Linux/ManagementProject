import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { blockStatement } from "@babel/types";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    width: "384px"
  },
  media: {
    height: 140
  },
  form: {
    maxWidth: "100%",
    padding: "20px"
  },
  buttonSubmit: {
    display: "block",
    margin: "auto",
    marginTop: "25px",
    marginBottom: "15px"
  },
  textField: {
    display: "block",
    margin: "auto"
  },
  user: {
    width: "100%"
  },
  password: {
    width: "100%"
  },
  input1: {
    width: "100%"
  },
  chip: {
    margin: 'auto'
  }
});

function SignIn(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
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
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <form className={classes.form} noValidate autoComplete="off">
            <FormControl className={clsx(classes.textField, classes.password)}>
              <TextField
                label="User"
                className={clsx(classes.input1)}
                id="margin-normal"
                helperText="Put your email"
                margin="normal"
              />
            </FormControl>
            <FormControl className={clsx(classes.textField, classes.password)}>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                className={clsx(classes.input1)}
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
            </FormControl>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
            >
              SignIn
            </Button>
          </form>

          <Chip
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
