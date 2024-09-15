import { css } from "@emotion/react";
import { Button } from "deventds2";
import { useNavigate } from "react-router";
import { isLocal } from "../utils/isLocal";
import { hosts } from "../api/hosts";
import { LogIn, Plus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { ACTION_ICON_COLOR, BORDER_COLOR, DESC_COLOR } from "../theme/color";
import { BackButton } from "../components/ui/BackButton";
import instance from "../api/axios";
import { useEffect, useState } from "react";

export function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [spaceList, setSpaceList] = useState([]);

  const handleClickGoogle = () => {
    location.href = isLocal()
      ? `${hosts.dev}/api/auth/google`
      : `${hosts.prod}/api/auth/google`;
  };

  const handleClickCreateSpace = async () => {
    try {
      const createSpace = await instance.post("space");
      const getId = createSpace.data.space.id;

      navigate(`/app/${getId}`);
    } catch (error) {}
  };

  const getSpaceList = async () => {
    try {
      const getSpace = await instance.get("space");

      setSpaceList([...getSpace.data.spaces]);
    } catch (error) {}
  };

  useEffect(() => {
    getSpaceList();
  }, []);

  return (
    <div
      css={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        flexDirection: "column",
      })}
    >
      <BackButton />
      <div
        css={css({
          display: "flex",
          padding: "1rem",
          maxWidth: "530px",
          alignItems: "center",
          height: "100%",
          paddingTop: "4rem",
          flexDirection: "column",
          gap: "1rem",
        })}
      >
        <span
          css={css({
            fontSize: "1.75rem",
            fontWeight: "600",
            alignItems: "center",
            paddingBottom: "2rem",
            display: "flex",
            gap: "0.5rem",
            zIndex: 99,
          })}
        >
          DashBoard
        </span>

        <div
          css={css({
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "0.5rem",
          })}
        >
          <Box onClick={handleClickCreateSpace}>
            <Plus css={css({ color: ACTION_ICON_COLOR })} />
          </Box>
          {spaceList.map((item) => (
            <Box onClick={() => navigate(`/app/${item.id}`)}>
              <b>{item.title}</b>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
}

function Box(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const { children }: { children?: React.ReactNode } = props;

  return (
    <div
      {...props}
      css={css({
        display: "flex",
        width: "120px",
        height: "120px",
        borderRadius: "0.5rem",
        justifyContent: "center",
        alignItems: "center",
        border: `1px solid #ededf2`,
        transition: "0.2s",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#ededf2",
        },
      })}
    >
      {children}
    </div>
  );
}
