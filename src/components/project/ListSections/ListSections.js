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
  { id: 1, name: "To Do", selected: true },
  { id: 2, name: "Doing", selected: false },
  { id: 3, name: "Done", selected: false }
];

function ListSection() {
  const classes = sectionListStyles();
  const [sectionState, updateSection] = useState(sections);

  const {isOpen,clickOnDrawer} = useContext(contextDrawer);

  const updateSectionState = data => {
    updateSection(data);
  };

  const changeSelectedSection = sectionId => {
    let sectionsChanged = sectionState.map(section =>
      section.id == sectionId
        ? { ...section, selected: !section.selected }
        : section
    );
    updateSectionState(sectionsChanged);
  };

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

              <CollapseTasks section={section} />
            </Fragment>
          ))}
      </List>
      <TaskDrawer open={isOpen}/>
    </Fragment>
  );
}

export default ListSection;
