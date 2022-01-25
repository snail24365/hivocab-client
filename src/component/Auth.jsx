import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import Welcome from "./Welcome";
import "./Auth.css";
import { AuthPageContext } from "../context/AuthPageStore";

const Auth = () => {
  const { title } = useContext(AuthPageContext);

  const backButton = (
    <Link to="/">
      <a className="back">
        <span>
          <i className="bx bx-arrow-back"></i>
        </span>
      </a>
    </Link>
  );

  const isWelcomePage = () => {
    let urlChunks = window.location.href.split("/");
    var lastChunk = urlChunks[urlChunks.length - 1];
    return lastChunk === "";
  };

  return (
    <div className="auth-container">
      <BrowserRouter>
        <div className="wrap-box">
          <div className="header">
            {isWelcomePage() ? null : backButton}
            <span className="title">{title}</span>
          </div>

          <Routes>
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/sign-up" element={<SignUpPage />} />
            <Route path="/" element={<Welcome />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Auth;
