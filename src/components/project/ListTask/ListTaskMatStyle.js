import { makeStyles } from "@material-ui/core/styles";

export const taskListStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  button: {
    marginLeft: "10px",
    marginRight: "10px"
  },
  text: {
    marginTop: "20px",
    marginBottom: "20px"
  },
  buttonDelete: {
    display: "flex",
    margin: "auto",
    marginTop: "45px",
    marginBottom: "15px",
    width: "450px"
  }
}));
