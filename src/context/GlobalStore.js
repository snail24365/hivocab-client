
import React, { useState } from 'react';

export const GlobalContext = React.createContext();

const GlobalStore = (props) => {

  const [isAuthenticated, setIsAuthenticated] = useState(true)

  return (
    <GlobalContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalStore;