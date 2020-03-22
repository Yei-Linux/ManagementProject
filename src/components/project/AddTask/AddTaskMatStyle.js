import { makeStyles } from "@material-ui/core/styles";

export const addTaskStyles = makeStyles({
  root: {
    width: "384px"
  },
  form: {
    maxWidth: "100%",
    padding: "40px"
  },
  formControl:{
    display: "block",
    margin: "auto",
    width: "50%"
  },
  input: {
    width: "100%"
  },
  buttonSubmit: {
    display: "flex",
    margin: "auto",
    marginTop: "25px",
    marginBottom: "15px",
    width: "450px"
  },
  chip: {
    margin: "auto"
  }
});