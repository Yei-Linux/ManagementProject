import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";

import { modalDrawerStyles } from "./ModalDrawerStyle";
import AsyncSelect from "react-select";
import Button from "@material-ui/core/Button";

import { searchUsers } from "../../../../../../services/userService";

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

function ModalDrawer({ open, parentCallBackClose }) {
  const classes = modalDrawerStyles();
  const [inputLetters,setInputLetters] = useState('');
  const [optionsSelect,setOptionSelect] = useState([]); 

  const handleInputChange = (firstLetters) => {
    if(firstLetters === ''){
      return
    }
    searchUsers(firstLetters).then((response)=>{
      setOptionSelect(response.data.usersFound);
    });
  };


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
