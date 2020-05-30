import React, { Fragment, useEffect, useState } from "react";
import { PublicCustomDiv } from "./styledPublicComponent";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./Public.css";
import { decryptData, readUrlEncrypted } from "../../helpers/encryptionHelper";
import { insertInvitedUserTask } from "../../services/invitedUserTaskService";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  buttonsFooter: {
    display: "flex",
    justifyContent: "flex-end"
  },
  buttonPrimary: {
    backgroundColor: "#2fc4b2",
    color: "white"
  }
});

function Public(props) {
  let [publicState, setPublicState] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    let urlEncryptedChanged = readUrlEncrypted(props.match.params.data);
    let data = decryptData(urlEncryptedChanged);
    setPublicState(JSON.parse(data));
  }, []);

  const confirmInvitation = async () => {
    await insertInvitedUserTask({user: publicState.user,project: publicState.project,task: publicState.task});
  }

  return (
    <Fragment>
      <PublicCustomDiv>
        {publicState && (
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/img/welcome.png"
                title="Contemplative Reptile"
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Hola!¿Te gustaria formar parte del proyecto{" "}
                  {publicState.projectName} que {publicState.userOwner} esta
                  construyendo?
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Si gustas formar parte del equipo da click en Si, de lo
                  contrario ya lo sabes.
                </Typography>
              </CardContent>
            </CardActionArea>

            <CardActions className={classes.buttonsFooter}>
              <Button size="small" color="primary">
                No
              </Button>
              <Button
                size="small"
                color="primary"
                className={classes.buttonPrimary}
                onClick={confirmInvitation}
              >
                Si
              </Button>
            </CardActions>
          </Card>
        )}
      </PublicCustomDiv>
    </Fragment>
  );
}

export default Public;
