import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalStore";
import { LOGOUT } from "../hook/useAuth";

const Sidebar = () => {
  const { authDispatch } = useContext(GlobalContext);
  const nav = useRef();

  const logout = () => {
    authDispatch(LOGOUT);
  };

  const toggle = () => {
    nav.current.classList.toggle("close");
  };

  return (
    <>
      <nav className="sidebar close" ref={nav}>
        <header>
          <div className="image-text">
            <span className="image">
              <span>H i</span>
            </span>

            <div className="text logo-text">
              <span className="name">Hi Vocab</span>
              <span className="profession">Master English</span>
            </div>
          </div>

          <i onClick={toggle} className="bx bx-chevron-right toggle"></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <Link to="/">
                <li className="nav-link">
                  <a href="#">
                    <i className="bx bx-home-alt icon"></i>
                    <span className="text nav-text">Exercise</span>
                  </a>
                </li>
              </Link>
              <Link to="/word-list">
                <li className="nav-link">
                  <a href="#">
                    <i className="bx bx-list-ul icon"></i>
                    <span className="text nav-text">Word List</span>
                  </a>
                </li>
              </Link>
              <Link to="/report">
                <li className="nav-link">
                  <a href="#">
                    <i className="bx bx-bar-chart-alt-2 icon"></i>
                    <span className="text nav-text">Report</span>
                  </a>
                </li>
              </Link>
            </ul>
          </div>

          <div className="bottom-content">
            <li className="">
              <a href="/" onClick={logout}>
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
