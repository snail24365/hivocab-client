import React from "react";
import "./Main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./Sidebar";

import Exercise from "./Exercise";
import WordList from "./WordList";
import Report from "./Report";
import { Progress } from "antd";

const Main = () => {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <section className="home">
          <Routes>
            <Route exact path="/word-list" element={<WordList />} />
            <Route path="/report" element={<Report />} />
            <Route path="/" element={<Exercise />} />
          </Routes>
        </section>
      </BrowserRouter>
    </>
  );
};

export default Main;
