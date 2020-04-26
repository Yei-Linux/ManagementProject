import { makeStyles } from "@material-ui/core/styles";

export const addTaskStyles = makeStyles({
  root: {
    width: "384px"
  },
  form: {
    maxWidth: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  formControl:{
    width: "450px",
    marginTop: "-15px"
  },
  input: {
    width: "100%",
    margin: 0,
    borderColor: "purple",
    fontFamily: "inherit"
  },
  buttonSubmit: {
    width: "175px",
    height: "35px",
    color: "white"
  },  
  iconAdd:{
    color: "#29c7ac"
  },
  chip: {
    margin: "auto"
  }
});