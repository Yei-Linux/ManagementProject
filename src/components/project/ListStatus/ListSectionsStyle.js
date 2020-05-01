import { makeStyles } from "@material-ui/core/styles";

export const sectionListStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: "30px"
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
  },
  listItem: {
    backgroundColor: "#8ec6c5",
    color: "white",
    "&:hover, &:focus": {
      backgroundColor: "#8ec6c5"
    }
  },
  listItemIcon: {
    color: "black",
    backgroundColor: "#8ec6c5",
    marginRight: "20px"
  },
  listItemText: {
    color: "white",
    fontFamily: "inherit",
    fontStyle: "cursive"
  },
  buttonStatus: {
    borderRadius: "2em",
    marginRight: "10px"
  }
}));
