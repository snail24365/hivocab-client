import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalStore";
import { LOGOUT } from "../hook/useAuth";

const Sidebar = () => {
  const { authDispatch } = useContext(GlobalContext);

  const logout = () => {
    authDispatch(LOGOUT);
  };

  return (
    <>
      <div>
        <Link to="/">
          <button>학습</button>
        </Link>
        <Link to="/word-list">
          <button>단어</button>
        </Link>
        <Link to="/report">
          <button>보고서</button>
        </Link>
        <button onClick={logout}>로그아웃</button>
      </div>
    </>
  );
};

export default Sidebar;
