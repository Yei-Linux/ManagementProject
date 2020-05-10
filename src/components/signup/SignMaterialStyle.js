import { makeStyles } from "@material-ui/core/styles";

export const signUpStyles = makeStyles({
  root: {
    width: "384px"
  },
  form: {
    maxWidth: "100%",
    padding: "20px"
  },
  formControl:{
    display: "block",
    margin: "auto",
    width: "100%"
  },
  input: {
    width: "100%"
  },
  buttonSubmit: {
    display: "block",
    margin: "auto",
    marginTop: "25px",
    marginBottom: "15px"
  },
  chip: {
    margin: "auto"
  },
  errorMessage: {
    color: 'red',
    marginTop: '5px'
  }
});
