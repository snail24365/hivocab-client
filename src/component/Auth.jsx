import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import WelcomePage from "./WelcomePage";
import "./Auth.css";

const Auth = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/sign-up" element={<SignUpPage />} />
            <Route path="/" element={<WelcomePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default Auth;
