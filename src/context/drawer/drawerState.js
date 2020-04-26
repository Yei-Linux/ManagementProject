import React, { useReducer } from 'react';
import contextDrawer from './drawerContext';
import reducerDrawer from './drawerReducer'

import { IS_OPEN_DRAWER } from '../types';

function DrawerState(props) {
    const initialState = {
        isOpen: false
    }

    const [state,dispatch] = useReducer(reducerDrawer,initialState);

    const clickOnDrawer = () =>{
        dispatch({
            type: IS_OPEN_DRAWER
        });
    }

    return (
        <contextDrawer.Provider
            value={{
                isOpen: state.isOpen,
                clickOnDrawer
            }}
        >
            {props.children}
        </contextDrawer.Provider>
    );
}

export default DrawerState