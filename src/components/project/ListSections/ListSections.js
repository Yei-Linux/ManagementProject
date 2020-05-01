import React, { useState, Fragment,useContext } from "react";
import { sectionListStyles } from "./ListSectionsStyle";
import CollapseTasks from "./CollapseTasks/CollapseTasks";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import TaskDrawer from "./CollapseTasks/TaskDrawer/TaskDrawer";
import contextDrawer from "../../../context/drawer/drawerContext";

const sections = [
  { id: "5eab3a6e6c3f964a8ccb0136", name: "To Do", selected: true },
  { id: "5eab3a786c3f964a8ccb0137", name: "Doing", selected: false },
  { id: "5eab3a7d6c3f964a8ccb0138", name: "Done", selected: false }
];

function ListSection() {
  const classes = sectionListStyles();
  const [sectionState, updateSection] = useState(sections);
  const [taskSelected,updateTaskSelected] = useState(null);

  const {isOpen,clickOnDrawer} = useContext(contextDrawer);

  const updateSectionState = data => {
    updateSection(data);
  };

  const updateTaskSelectedState = data => {
    updateTaskSelected(data);
  }

  const changeSelectedSection = sectionId => {
    let sectionsChanged = sectionState.map(section =>
      section.id == sectionId
        ? { ...section, selected: !section.selected }
        : section
    );
    updateSectionState(sectionsChanged);
  };

  const setTaskSelected = (data) => {
    updateTaskSelectedState(data);
  }

  return (
    <Fragment>
      <List className={classes.root}>
        {sectionState &&
          sectionState.map((section, index) => (
            <Fragment>
              <ListItem button key={section.id} className={classes.listItem}>
                <AssignmentTurnedInIcon className={classes.listItemIcon} />

                <ListItemText
                  primary={`${section.name}`}
                  onClick={event => changeSelectedSection(section.id)}
                  className={classes.listItemText}
                />
                {section.selected ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <CollapseTasks section={section} parentTaskCallBack={setTaskSelected}/>
            </Fragment>
          ))}
      </List>
      <TaskDrawer open={isOpen} task = {taskSelected}/>
    </Fragment>
  );
}

export default ListSection;
