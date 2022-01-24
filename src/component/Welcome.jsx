import React, { useContext } from "react";
import { AuthPageContext } from "../context/AuthPageStore";
import "./Welcome.css";

const Welcome = () => {
  const { setWelcomeTitle } = useContext(AuthPageContext);
  setWelcomeTitle();

  return (
    <div className="welcome-container">
      <a href="/login">
        <div className="card">
          <i class="bx bx-log-in"></i>
        </div>
        <div className="hover-message">
          <p>로그인</p>
        </div>
      </a>

      <div className="spacing"></div>
      <a href="/sign-up">
        <div className="card">
          <i class="bx bx-user-plus"></i>
        </div>
        <div className="hover-message">
          <p>회원가입</p>
        </div>
      </a>
    </div>
  );
};

export default Welcome;
