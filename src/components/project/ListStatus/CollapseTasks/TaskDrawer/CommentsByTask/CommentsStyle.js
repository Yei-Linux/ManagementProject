import { makeStyles } from "@material-ui/core/styles";

export const commentsStyle = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  textArea: {
      width: "80%",
      margin: "10px auto",
      marginTop: "auto"
  },
  divButton: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    margin: theme.spacing(1),
    maxWidth: '80px',
    marginRight: '50px'
  }
}));