import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import SignIn from "../../components/signIn/SignIn";
import { CustomDiv } from "./styledComponent";

import SignUp from "../../components/signup/SignUp";
import { useLocation } from "react-router-dom";

function Login(props) {
  const location = useLocation();

  useEffect(() => {
  }, []);

  return (
    <Fragment>
      <CustomDiv>{location.pathname == "/signup" ? <SignUp /> : <SignIn />}</CustomDiv>
    </Fragment>
  );
}

export default Login;

Login.propTypes = {};
