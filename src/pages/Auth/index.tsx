import { css } from "@emotion/react";
import { Button } from "deventds2";
import { useNavigate } from "react-router";
import { isLocal } from "@/utils/isLocal";
import { hosts } from "@/api/hosts";
import { LogIn } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import { Loading } from "@/components/ui/common/Loading";
import { useState } from "react";

export function AuthPage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleClickGoogle = () => {
    setIsLoading(true);

    setTimeout(() => {
      location.href = isLocal()
        ? `${hosts.dev}/api/auth/google`
        : `${hosts.prod}/api/auth/google`;
    }, 300);
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
      <BackButton />

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
            fontSize: "1.75rem",
            fontWeight: "600",
            alignItems: "center",
            display: "flex",
            gap: "0.5rem",
          })}
        >
          <LogIn /> Get Started!
        </span>

        <div
          css={css({
            paddingTop: "1rem",
          })}
        >
          <Button color="black" width="240px" onClick={handleClickGoogle}>
            {isLoading && <Loading />}
            Google Auth
          </Button>
        </div>
      </div>
    </div>
  );
}
