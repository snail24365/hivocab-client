import React from "react";
import "./Main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

import Exercise from "./Exercise";
import WordList from "./WordList";
import Report from "./Report";

/*
                <Routes>
                  <Route exact path="/exercise" element={<Exercise />} />
                  <Route exact path="/word-list" element={<WordList />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/" element={<Report />} />
                </Routes>
*/
const Main = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <Sidebar />
          <div>hihihihiasdf</div>
          <div>
            <Header></Header>

            <div>
              <div></div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Main;
