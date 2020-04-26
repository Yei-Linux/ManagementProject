import AppBar from "@material-ui/core/AppBar";
import { makeStyles, fade,useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useHomeStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: "#ffbd69"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#8b28f6",
    color: "white"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "space-evenly",
    backgroundColor: "#151b26"
  },
  mainStyle: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth+50,
    backgroundColor: "white"
  },
  content1: {
    marginTop: "100px"
  },
  content2: {
    marginTop: "50px"
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 50
  },
  text: {
      paddingTop: "6px",
      textAlign: "center",
      fontFamily: "Liu Jian Mao Cao",
      fontStyle: "cursive",
      fontSize: "2em",
      marginBottom: "10px"
  },
  icon:{
    color: "white"
  },
  iconAdd:{
    color: "#29c7ac"
  },
  button: {
    margin: theme.spacing(2),
  },
  buttonAddProject: {
    width: "60%",
    marginTop: "10px",
    marginBottom: "10px",
    backgroundColor: "#fec771",
    '&:hover': {
      backgroundColor: '#FFC482',
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  margin: {
    margin: theme.spacing(1)
  },
  input: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    }
  },
  textSecondary: {
    fontFamily: "inherit"
  }
}));
