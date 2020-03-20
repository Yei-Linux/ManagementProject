import React from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

function SignIn(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Standard" type = "email"/>
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <Button variant="contained" color="primary">
              Primary
            </Button>
          </form>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default SignIn;


