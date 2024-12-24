import { css } from "@emotion/react";
import {
  BookText,
  ChevronLeft,
  CircleUser,
  Folder,
  FolderCode,
  House,
  LayoutDashboard,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SideMenu, SideMenuItem } from "./SIdeMenu";

const IconStyle = css({
  width: "18px",
  height: "18px",
});
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
        <SideMenuItem onClick={() => navigate("/")}>
          <House css={IconStyle} /> Home
        </SideMenuItem>
        <SideMenuItem onClick={() => navigate("/dashboard")}>
          <Folder css={IconStyle} /> Dashboard
        </SideMenuItem>
        <SideMenuItem onClick={() => navigate("/profile")}>
          <User css={IconStyle} /> Profile
        </SideMenuItem>
        <SideMenuItem onClick={() => navigate("/credit")}>
          <FolderCode css={IconStyle} /> Makers
        </SideMenuItem>
        <SideMenuItem onClick={() => navigate("/docs")}>
          <BookText css={IconStyle} /> Docs
        </SideMenuItem>
      </SideMenu>
    </>
  );
}
