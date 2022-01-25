import axios from "axios";
import React, { useContext, useRef } from "react";
import { AuthPageContext } from "../context/AuthPageStore";
import "./SignUpPage.css";

const SignUpPage = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { setSignUpTitle } = useContext(AuthPageContext);
  setSignUpTitle();

  const signUp = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    if (password !== passwordConfirm) {
      alert("패스워드가 일치하지 않습니다. 다시 확인해주세요.");
      return;
    }
    axios
      .post("/user", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        const OK = 200;
        if (res.status === OK) {
          alert("회원가입을 하였습니다. 로그인 해주세요.");
          window.location.href = "/";
        } else {
          alert("서버 오류가 발생했습니다. 잠시 뒤에 다시 시도해주십시오.");
          window.location.href = "/sign-up";
        }
      })
      .catch((err) => {
        switch (err.response.status) {
          case 409:
            alert("이미 존재하는 유저 이름입니다.");
            break;
          case 400:
            alert("아이디, 비밀번호 자릿수를 확인해주십시오.");
            break;
          default:
            alert("서버 오류가 발생했습니다. 잠시 뒤에 다시 시도해주십시오.");
            window.location.href = "/sign-up";
        }
      });
  };

  return (
    <div className="sign-up-container">
      <div className="formBox">
        <input
          type="text"
          id="username"
          placeholder="아이디"
          ref={usernameRef}
          autocomplete="off"
        />
        <label>아이디는 5자리 이상의 조합을 사용해주세요.</label>

        <input
          type="password"
          id="password"
          placeholder="패스워드"
          ref={passwordRef}
          autocomplete="off"
        />
        <label>패스워드는 8자리 이상의 조합을 사용해주세요.</label>

        <input
          type="password"
          id="passwordConfirm"
          placeholder="패스워드 확인"
          ref={passwordConfirmRef}
          autocomplete="off"
        />
        <button onClick={signUp}>등록</button>
      </div>
    </div>
  );
};

export default SignUpPage;
