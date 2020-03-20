import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SignIn from '../../components/signIn/SignIn';

function Login(props) {
    return (
        <Fragment>
            <SignIn />
        </Fragment>
    );
}

export default Login;

Login.propTypes = {
    
};