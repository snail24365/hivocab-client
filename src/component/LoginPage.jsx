import React, { useContext, useRef } from "react";
import { AuthPageContext } from "../context/AuthPageStore";
import { GlobalContext } from "../context/GlobalStore";
import { LOGIN } from "../hook/useAuth";
import "./LoginPage.css";

const LoginPage = () => {
  const { authDispatch } = useContext(GlobalContext);
  const { setLoginTitle } = useContext(AuthPageContext);
  setLoginTitle();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const login = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const payload = { username, password };
    authDispatch(LOGIN, payload);
  };

  return (
    <div className="login-container">
      <div className="formBox">
        <input
          type="text"
          id="username"
          placeholder="아이디"
          ref={usernameRef}
          autocomplete="off"
        />

        <input
          type="password"
          id="password"
          placeholder="패스워드"
          ref={passwordRef}
          autocomplete="off"
        />
        <button onClick={login}>접속</button>
      </div>
    </div>
  );
};

export default LoginPage;
