import axios from 'axios';
import { useState } from 'react';
import { SERVER } from '../util/net';
import { deleteCookie, setCookie } from '../util/util';

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const CHECK = "CHECK";

const useAuth = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let dispatch = (type, payload) => {
    switch (type) {
      case CHECK:
        axios.get(SERVER + "/ping")
          .then(response => {
            setIsAuthenticated(response.status === 200)
          });
        break;

      case LOGIN:
        axios.post(SERVER + "/login", JSON.stringify(payload))
          .then(response => {
            console.log("ERROR" + response)
            if (response.status === 200) {
              setIsAuthenticated(true);
              setCookie("Authorization", 'Bearer ' + response.data["access_token"], 60 * 24);
              window.location.href = "/";
            }
          })
          .catch(e => {
            alert("아이디, 패스워드가 일치하지 않습니다.")
          })
        break;

      case LOGOUT:
        deleteCookie("Authorization")
        window.location.href = "/"
        break;

      default:
        break;
    }
  }

  return [isAuthenticated, dispatch];
}

export default useAuth;