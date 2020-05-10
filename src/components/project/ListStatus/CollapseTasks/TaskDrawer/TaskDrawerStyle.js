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
    marginBottom: "40px",
    '@media(max-width: 570px)' : {
      flexDirection: "column !important",
      marginBottom: "20px !important"
    }
  },
  input: {
    width: "100%",
    marginTop: "-12px !important" ,
    '@media(max-width: 570px)' : {
      marginTop: "12px !important"
    }
  },
  priorityClass: {
    width: '100px'
  },
  label: {
    marginRight: "20px",
    width: "150px"
  },
  cardHeader: {
    backgroundColor: "#43d8c9",
    color: "white"
  },
  cardHeaderContent: {
    display: "flex",
    justifyContent: "space-between",
    '@media(max-width: 570px)' : {
      flexDirection: "column !important"
    }
  },
  cardContent: {
    paddingTop: "25px"
  },
  errorMessage: {
    color: 'red',
    marginTop: '5px'
  },
  drawerStyle: {
    '@media(max-width: 570px)' : {
      width: "100% !important"
    }
  },
  selectStatus: {
    width: "fit-content",
    color: "white"
  },
  textField: {
    width: "100%"
  },
  cardFooter: {
    justifyContent: "space-around"
  },
  heardIcon: {
    '&:hover':{
      color: "red"
    }
  },
  shareIcon: {
    '&:hover':{
      color: "#43d8c9"
    }
  }
}));
