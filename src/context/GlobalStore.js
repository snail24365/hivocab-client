
import React, { useEffect, useReducer, useState } from 'react';
import useAuth from '../hook/useAuth';
import { authReducer, CHECK, LOGIN } from '../reducer/AuthReducer';

export const GlobalContext = React.createContext();

const GlobalStore = (props) => {

  const [isAuthenticated, authDispatch] = useAuth()

  useEffect(() => {
    authDispatch(CHECK);
  }, [])

  return (
    <GlobalContext.Provider value={{ isAuthenticated, authDispatch }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalStore;