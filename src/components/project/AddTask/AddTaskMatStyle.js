import { makeStyles } from "@material-ui/core/styles";

export const addTaskStyles = makeStyles({
  root: {
    width: "384px"
  },
  form: {
    maxWidth: "100%",
    display: "flex",
    justifyContent: "space-between",
    '@media(max-width: 800px)' : {
      flexDirection: 'column',
      alignItems: "center"
    }
  },
  formControl:{
    width: "450px",
    marginTop: "-15px",
    '@media(max-width: 800px)' : {
      width: "100%"
    }
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
    color: "white",
    '@media(max-width: 800px)' : {
      marginTop: "30px"
    }
  },  
  iconAdd:{
    color: "#29c7ac"
  },
  chip: {
    margin: "auto"
  },
  errorMessage: {
    color: 'red',
    marginTop: '5px'
  }
});