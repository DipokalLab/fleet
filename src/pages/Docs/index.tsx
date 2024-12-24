import { css } from "@emotion/react";
import { Button } from "deventds2";
import { useNavigate } from "react-router";
import { isLocal } from "@/utils/isLocal";
import { hosts } from "@/api/hosts";
import { LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { BackButton } from "@/components/ui/BackButton";
import { Nav } from "@/components/ui/common/Nav";
import { useState } from "react";
import { Loading } from "@/components/ui/common/Loading";

export function DocsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickLogout = () => {
    setIsLoading(true);

    setTimeout(() => {
      logout();
    }, 200);
  };

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
      <Nav />

      <div
        css={css({
          display: "flex",
          padding: "1rem",
          maxWidth: "530px",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          flexDirection: "column",
          gap: "1rem",
        })}
      >
        <span
          css={css({
            fontSize: "1.125rem",
            fontWeight: "600",
            alignItems: "center",
            display: "flex",
            gap: "0.5rem",
          })}
        >
          Docs
        </span>

        <div
          css={css({
            paddingTop: "1rem",
          })}
        >
          <Button
            color="white"
            width="240px"
            onClick={() => navigate("/docs/privacy")}
          >
            Privacy
          </Button>
        </div>
      </div>
    </div>
  );
}
