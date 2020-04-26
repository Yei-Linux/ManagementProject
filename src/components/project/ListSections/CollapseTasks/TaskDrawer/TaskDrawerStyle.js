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
  label: {
    marginRight: "20px",
    width: "150px"
  }
}));
