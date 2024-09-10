import { useEffect, useState } from "react";
import { getCookies, setCookie } from "../utils/cookie";

function useAuth() {
  const isLogin = () => {
    const data = parseToken();
    if (data.hasOwnProperty("userId")) {
      const userId = data.userId;
      return true;
    }

    return false;
  };

  const logout = () => {
    setCookie("token", "");

    setTimeout(() => {
      location.href = "/";
    }, 500);
  };

  const parseToken = () => {
    try {
      const cookies: any = getCookies();
      if (cookies.hasOwnProperty("token")) {
        const token = cookies.token;
        const decoded = JSON.parse(atob(token.split(".")[1]));
        return decoded;
      }

      return "";
    } catch (error) {
      return "";
    }
  };

  return { isLogin, logout };
}

export { useAuth };
