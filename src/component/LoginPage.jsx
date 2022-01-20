import React, { useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalStore";
import { LOGIN } from "../hook/useAuth";

const LoginPage = () => {
  const { authDispatch } = useContext(GlobalContext);

  const usernameRef = useRef();
  const passwordRef = useRef();
  const login = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const payload = { username, password };
    authDispatch(LOGIN, payload);
  };

  return (
    <>
      <div>
        <a href="/">뒤로가기</a>
        <input
          type="text"
          id="username"
          placeholder="username"
          ref={usernameRef}
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          ref={passwordRef}
        />
        <button onClick={login}>로그인</button>
      </div>
    </>
  );
};

export default LoginPage;
