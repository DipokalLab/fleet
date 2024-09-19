import { css } from "@emotion/react";
import { ChevronLeft, CircleUser, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function Nav() {
  const navigate = useNavigate();
  const [nowActive, setNowActive] = useState("");

  const checkActivePage = () => {
    setNowActive(location.pathname.split("/")[1]);
  };

  const handleClickItem = (url: string) => {
    navigate(url);
  };

  useEffect(() => {
    checkActivePage();
  }, []);

  return (
    <div
      css={css({
        position: "fixed",
        display: "flex",
        top: "0.5rem",
        right: "0.5rem",
        padding: "0rem 1rem",
        height: "2.5rem",
        borderRadius: "100px",
        transition: "0.2s",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        gap: "0.5rem",

        ":hover": {
          backgroundColor: "#ededf2",
        },
      })}
    >
      <b
        css={css({
          color: nowActive == "dashboard" ? "#000000" : "#74747a",
        })}
        onClick={() => handleClickItem("/dashboard")}
      >
        Dashboard
      </b>
      <b
        css={css({
          color: nowActive == "profile" ? "#000000" : "#74747a",
        })}
        onClick={() => handleClickItem("/profile")}
      >
        Profile
      </b>
    </div>
  );
}
