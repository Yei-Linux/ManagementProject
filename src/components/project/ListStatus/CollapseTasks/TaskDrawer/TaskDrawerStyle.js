import { makeStyles } from "@material-ui/core/styles";
import { red } from '@material-ui/core/colors';

export const drawerStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500
  },
  avatar: {
    backgroundColor: red[500],
  },
  form: {
    maxWidth: "100%",
    padding: "20px"
  },
  formControl:{
    flexDirection: "row",
    width: "100%",
    marginBottom: "40px"
  },
  input: {
    width: "100%",
    marginTop: "-12px !important" 
  },
  priorityClass: {
    width: '100px'
  },
  label: {
    marginRight: "20px",
    width: "150px"
  },
  cardHeaderContent: {
    display: "flex",
    justifyContent: "space-between"
  },
  cardContent: {
    paddingTop: "25px",
    paddingBottom: "25px"
  },
  errorMessage: {
    color: 'red',
    marginTop: '5px'
  }
}));
