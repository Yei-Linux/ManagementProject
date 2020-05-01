import React, { useState, useContext, Fragment } from "react";
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
import UpdateIcon from "@material-ui/icons/Update";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { drawerStyles } from "./TaskDrawerStyle";

import { Formik } from "formik";
import Button from "@material-ui/core/Button";

function TaskDrawer({ open, task }) {
  const { isOpen, clickOnDrawer } = useContext(contextDrawer);
  const classes = drawerStyles();

  const [sectionTask, setSectionTask] = useState("");
  const [openSelect, setOpenSelect] = useState(false);

  const handleChangeSelect = event => {
    setSectionTask(event.target.value);
  };

  const handleClose = () => {
    setOpenSelect(false);
  };

  const handleOpen = () => {
    setOpenSelect(true);
  };

  return (
    <Fragment>
      {task && (
        <SwipeableDrawer anchor="right" open={open} onClose={clickOnDrawer}>
          <Formik
            initialValues={{
              name: task.name,
              status: task.status,
              finishedAt: task.finishedAt ? task.finishedAt : Date.now(),
              priority: task.priority,
              description: task.description
            }}
            onSubmit={data => {
              console.log(data);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue
            }) => (
              <form onSubmit={handleSubmit} className={classes.form}>
                <Card className={classes.root}>
                  <CardHeader
                    action={
                      <Fragment>
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      </Fragment>
                    }
                    title={
                      <div className={classes.cardHeaderContent}>
                        <h5 onChange={handleChange}>{values.name}</h5>
                        <Select
                          labelId="demo-controlled-open-select-label"
                          id="demo-controlled-open-select"
                          open={openSelect}
                          onClose={handleClose}
                          onOpen={handleOpen}
                          value={sectionTask}
                          onChange={handleChangeSelect}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={"5eab3a6e6c3f964a8ccb0136"}>
                            To Do
                          </MenuItem>
                          <MenuItem value={"5eab3a786c3f964a8ccb0137"}>
                            Doing
                          </MenuItem>
                          <MenuItem value={"5eab3a7d6c3f964a8ccb0138"}>
                            Done
                          </MenuItem>
                        </Select>
                      </div>
                    }
                  />

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
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
                            label="Finish Date of Task"
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}
                            onChange={event => {
                              if (event != "Invalid Date") {
                                setFieldValue(
                                  "finishedAt",
                                  new Date(event).toISOString()
                                );
                              }
                            }}
                            onBlur={handleBlur}
                            name="finishedAt"
                            value={values.finishedAt}
                          />
                        </MuiPickersUtilsProvider>
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
                          inputProps={{ "aria-label": "description" }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="description"
                          value={values.description}
                        />
                      </FormControl>
                    </Typography>
                  </CardContent>

                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>

                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={
                        <IconButton aria-label="update Task">
                          <UpdateIcon />
                        </IconButton>
                      }
                      type="submit"
                    >
                      Update Task
                    </Button>
                  </CardActions>
                </Card>
              </form>
            )}
          </Formik>
        </SwipeableDrawer>
      )}
    </Fragment>
  );
}

export default TaskDrawer;
