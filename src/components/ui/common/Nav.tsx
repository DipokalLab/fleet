import { css } from "@emotion/react";
import { ChevronLeft, CircleUser, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SideMenu, SideMenuItem } from "./SIdeMenu";

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
    <>
      <SideMenu>
        <SideMenuItem onClick={() => navigate("/")}>/</SideMenuItem>
        <SideMenuItem onClick={() => navigate("/dashboard")}>
          Dashboard
        </SideMenuItem>
        <SideMenuItem onClick={() => navigate("/profile")}>
          Profile
        </SideMenuItem>
      </SideMenu>
    </>
  );
}
