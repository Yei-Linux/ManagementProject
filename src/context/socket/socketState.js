import React, { useReducer } from 'react';
import contextSocket from './socketContext';
import reducerSocket from './socketReducer';
import { SAVING_SOCKET, SET_COMMENTS, ADD_COMMENT } from '../types';

function SocketState(props) {
    const initialState = {
        socket: null,
        comments: []
    }

    const [state,dispatch] = useReducer(reducerSocket,initialState);

    const savingSocket = (data) => {
        dispatch({
            type: SAVING_SOCKET,
            payload: data
        });
    }

    const setComments = (data) => {
        dispatch({
            type: SET_COMMENTS,
            payload: data
        });
    }

    const addComment = (data) => {
        dispatch({
            type: ADD_COMMENT,
            payload: data
        });
    }

    return (
        <contextSocket.Provider
            value={{
                socket: state.socket,
                comments: state.comments,
                savingSocket,
                setComments,
                addComment
            }}
        >
            {props.children}
        </contextSocket.Provider>
    );
}

export default SocketState