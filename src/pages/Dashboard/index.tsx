import { css } from "@emotion/react";
import { Button } from "deventds2";
import { useNavigate } from "react-router";
import { isLocal } from "@/utils/isLocal";
import { hosts } from "@/api/hosts";
import { LogIn, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ACTION_ICON_COLOR, BORDER_COLOR, DESC_COLOR } from "@/theme/color";
import { BackButton } from "@/components/ui/BackButton";
import instance from "@/api/axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/common/Skeleton";
import { Nav } from "@/components/ui/common/Nav";
import { Loading } from "@/components/ui/common/Loading";

export function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [spaceList, setSpaceList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const [isTransition, setIsTransition] = useState(false);

  const handleClickCreateSpace = async () => {
    if (isCreateLoading) {
      return false;
    }

    setIsCreateLoading(true);

    try {
      const createSpace = await instance.post("space");
      const getId = createSpace.data.space.id;

      navigate(`/app/${getId}`);
    } catch (error) {
      setIsCreateLoading(false);
    }
  };

  const handleClickGoSpace = (id: string) => {
    setIsTransition(true);

    setTimeout(() => {
      navigate(id);
    }, 300);
  };

  const getSpaceList = async () => {
    try {
      const getSpace = await instance.get("space");

      setSpaceList([...getSpace.data.spaces]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
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
      <Nav />

      <Transition isShow={isTransition} />
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
            {isCreateLoading ? (
              <Loading />
            ) : (
              <Plus css={css({ color: ACTION_ICON_COLOR })} />
            )}
          </Box>
          {isLoading && (
            <>
              <Skeleton width={120} height={120}></Skeleton>
              <Skeleton width={120} height={120}></Skeleton>
              <Skeleton width={120} height={120}></Skeleton>
            </>
          )}
          {spaceList.map((item) => (
            <Box onClick={() => handleClickGoSpace(`/app/${item.id}`)}>
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

function Transition({ isShow }: { isShow?: boolean }) {
  return (
    <div
      css={css({
        position: "fixed",
        top: 0,
        height: "100%",
        width: "100vw",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: isShow ? "100%" : "0",
        visibility: isShow ? "visible" : "hidden",
        transition: ".2s",
        zIndex: 900,
      })}
    ></div>
  );
}
