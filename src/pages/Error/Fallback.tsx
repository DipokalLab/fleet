import { css } from "@emotion/react";
import { Button } from "deventds2";
import { useNavigate } from "react-router";
import { isLocal } from "../../utils/isLocal";
import { hosts } from "../../api/hosts";
import { LogIn } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export function FallbackPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleClickGoogle = () => {
    location.href = isLocal()
      ? `${hosts.dev}/api/auth/google`
      : `${hosts.prod}/api/auth/google`;
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
            position: "fixed",

            fontSize: "2.75rem",
            transform: "scale(5)",
            fontWeight: "600",
            color: "#f5f5f7",
            alignItems: "center",
            textAlign: "center",
            display: "flex",
            gap: "0.5rem",
            transition: "0.2s",

            ":hover": {
              transform: "scale(7)",
            },
          })}
        >
          ERROR
        </span>
        <span
          css={css({
            fontSize: "1.75rem",
            fontWeight: "600",
            alignItems: "center",
            display: "flex",
            gap: "0.5rem",
            zIndex: 99,
          })}
        >
          An error occurred
        </span>

        <div
          css={css({
            paddingTop: "1rem",
            zIndex: 99,
          })}
        >
          <Button
            color="black"
            width="240px"
            onClick={() => (location.href = "/")}
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
