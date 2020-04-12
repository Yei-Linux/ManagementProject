import { makeStyles } from "@material-ui/core/styles";

export const collapseStyles = makeStyles(theme => ({
  collapse: {
    backgroundColor: "#f2ed6f"
  },
  root: {
    width: "100%",
    maxWidth: 500,
    margin: "auto",
    marginTop: "50px",
    marginBottom: "50px",
    backgroundColor: theme.palette.background.paper
  },
  formControl: {
    display: "block",
    margin: "auto",
    marginBottom: "15px",
    width: "50%"
  },
  buttonSubmit: {
    display: "flex",
    margin: "auto",
    marginTop: "25px",
    marginBottom: "15px",
    width: "50%"
  },
}));
