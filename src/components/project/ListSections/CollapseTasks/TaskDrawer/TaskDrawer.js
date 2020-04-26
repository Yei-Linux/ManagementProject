import React, { useContext } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import contextDrawer from "../../../../../context/drawer/drawerContext";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

import InputLabel from "@material-ui/core/InputLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

import { drawerStyles } from "./TaskDrawerStyle";

function TaskDrawer({ open }) {
  const { isOpen, clickOnDrawer } = useContext(contextDrawer);
  const classes = drawerStyles();

  return (
    <SwipeableDrawer anchor="right" open={open} onClose={clickOnDrawer}>
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Tarea2"
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <form>
              <FormControl className={classes.formControl}>
                <FormLabel className={classes.label} htmlFor="mi-campo">
                  Responsable
                </FormLabel>
                <AvatarGroup max={3} className={classes.input}>
                  <Avatar alt="Remy Sharp" src="/img/1.jpg" />
                  <Avatar alt="Travis Howard" src="/img/2.jpg" />
                  <Avatar alt="Cindy Baker" src="/img/3.jpg" />
                  <Avatar alt="Cindy Baker" src="/img/3.jpg" />
                </AvatarGroup>
              </FormControl>

              <FormControl className={classes.formControl}>
                <FormLabel className={classes.label} htmlFor="mi-campo">
                  Fecha de Entrega
                </FormLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.input}
                    disableToolbar
                    variant="inline"
                    inputVariant="outlined"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Task Init Date"
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                    name="initializedAt"
                  />
                </MuiPickersUtilsProvider>
              </FormControl>

              <FormControl className={classes.formControl}>
                <FormLabel className={classes.label} htmlFor="mi-campo">
                  Proyectos
                </FormLabel>
                <Input
                  className={classes.input}
                  defaultValue="Hello world"
                  inputProps={{ "aria-label": "description" }}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <FormLabel className={classes.label} htmlFor="mi-campo">
                  Prioridad
                </FormLabel>
                <Chip
                  className={classes.input}
                  color="primary"
                  deleteIcon={<DoneIcon />}
                  avatar={<Avatar>B</Avatar>}
                  label="Baja"
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <FormLabel className={classes.label} htmlFor="mi-campo">
                  Descripcion
                </FormLabel>
                <Input
                  className={classes.input}
                  defaultValue="Hello world"
                  inputProps={{ "aria-label": "description" }}
                />
              </FormControl>
            </form>
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </SwipeableDrawer>
  );
}

export default TaskDrawer;
