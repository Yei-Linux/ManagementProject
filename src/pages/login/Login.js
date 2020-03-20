import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SignIn from '../../components/signIn/SignIn';
import { CustomDiv } from './styledComponent';

function Login(props) {
    return (
        <Fragment>
            <CustomDiv>
                <SignIn />
            </CustomDiv>    
        </Fragment>
    );
}

export default Login;

Login.propTypes = {
    
};