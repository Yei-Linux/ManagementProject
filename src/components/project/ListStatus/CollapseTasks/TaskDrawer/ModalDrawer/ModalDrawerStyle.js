import { makeStyles } from "@material-ui/core/styles";

export const modalDrawerStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  footerButtons: {
      marginTop: "30px",
      display: "flex",
      flexDirection: "flex-start"
  },
  buttonFooter: {
      marginRight: "10px"
  }
}));
