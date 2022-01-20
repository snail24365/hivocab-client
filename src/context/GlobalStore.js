import React, { useEffect } from 'react';
import useAuth, { CHECK } from '../hook/useAuth';

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