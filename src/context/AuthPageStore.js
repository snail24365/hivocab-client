import React, { useState } from 'react';

export const AuthPageContext = React.createContext();

const AuthPageStore = (props) => {

  const welcomeTitle = "Welcome to HiVocab";
  const loginTitle = "로그인";
  const signUpTitle = "회원가입";


  const [title, setTitle] = useState(welcomeTitle);
  const setWelcomeTitle = () => {
    setTitle(welcomeTitle)
  }
  const setLoginTitle = () => {
    setTitle(loginTitle)
  }
  const setSignUpTitle = () => {
    setTitle(signUpTitle)
  }

  return (
    <AuthPageContext.Provider value={{ title, setWelcomeTitle, setLoginTitle, setSignUpTitle }}>
      {props.children}
    </AuthPageContext.Provider>
  )
}

export default AuthPageStore;