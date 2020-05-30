import React, { useState,useContext } from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";

import { modalDrawerStyles } from "./ModalDrawerStyle";
import AsyncSelect from "react-select";
import Button from "@material-ui/core/Button";

import { searchUsers } from "../../../../../../services/userService";
import { emailTemplate } from '../../../../../../constant/emailTemplate';
import { sendEmailNotification } from "../../../../../../services/notificationService";
import { replaceValuesInTemplate } from "../../../../../../helpers/DataHelper";
import contextTask from "../../../../../../context/task/taskContext";
import { encryptData, changeSpecialsCharacteresOfUrlEncrypted } from "../../../../../../helpers/encryptionHelper";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

function ModalDrawer({ open, parentCallBackClose, task }) {
  const classes = modalDrawerStyles();
  const [optionsSelected,setOptionsSelected] = useState([]);
  const [optionsSelect,setOptionSelect] = useState([]); 

  const {
    projectByTasks
  } = useContext(contextTask);

  const handleInputChange = (firstLetters) => {
    if(firstLetters === ''){
      return
    }
    searchUsers(firstLetters).then((response)=>{
      setOptionSelect(response.data.usersFound);
    });
  };

  const sendNotifications = async () => {
    for(const user of optionsSelected){
      let urlEncryptedByUser = encryptUrl(user.value);
      let templateReplaced = replaceValuesInTemplate(emailTemplate(),{"userOwner": localStorage.getItem('user_name'),"projectName":projectByTasks.name,"task":task.name,"linkEncrypted":urlEncryptedByUser});
      let result = await sendEmailNotification({to: user.label,subject: 'Invitation to Project in Managmet Projects-Yei Linux',message: 'Some wants to join them!',template: templateReplaced});
    }
  }

  const encryptUrl = (user) =>{
    let objectToSend = {
      user:user,
      project:projectByTasks._id,
      task:task._id,
      projectName: projectByTasks.name,
      userOwner: localStorage.getItem('user_name')
    }
    let dataEncrypted = encryptData(JSON.stringify(objectToSend));
    dataEncrypted = changeSpecialsCharacteresOfUrlEncrypted(dataEncrypted);
    return `http://localhost:3000/confirm/${dataEncrypted}`;
  }

  const onChangeSelect = (data) => {
    setOptionsSelected(data);
  }


  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className={classes.modal}
      open={open}
      onClose={parentCallBackClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="spring-modal-title">Users Search</h2>
          <p id="spring-modal-description">
            Search users to collaborates with you and send{" "}
            <strong>Invitation</strong>
          </p>

          <AsyncSelect
            isMulti
            options={optionsSelect}
            onInputChange={handleInputChange}
            onChange={onChangeSelect}
          />

          <div className={classes.footerButtons}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.buttonFooter}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              className={classes.buttonFooter}
              onClick={sendNotifications}
            >
              Send
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

export default ModalDrawer;
