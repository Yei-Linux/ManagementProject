import { makeStyles } from "@material-ui/core/styles";

export const collapTaskseStyles = makeStyles(theme => ({
  collapse: {
    backgroundColor: "#d4ebd0"
  },
  root: {
    width: "85%",
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
  textField: {
    width: "100%"
  },
  buttonSubmit: {
    display: "flex",
    margin: "auto",
    marginTop: "25px",
    marginBottom: "15px",
    width: "50%"
  },

  listItem: {
    width: "100%"
  },
  listItemIcon: {
    marginRight: "20px"
  },
  badge: {
    marginRight: "20px",
    '@media(max-width: 800px)' : {
      display: "none !important"
    }
  },
  date: {
    marginRight: "20px",
    '@media(max-width: 800px)' : {
      display: "none !important"
    }
  },
  backgroundEmptyTask:{
    width: '100%',
    backgroundColor: 'white'
  },
  emptyTask: {
    width: '70%',
    height: '360px',
    margin: 'auto',
    backgroundImage:  "url('http://localhost:3000/img/spaceTasks.gif')",
    backgroundSize: '100% 360px'
  }
}));
