import { css } from "@emotion/react";
import { Button } from "deventds2";
import { useNavigate } from "react-router";
import { isLocal } from "@/utils/isLocal";
import { hosts } from "@/api/hosts";
import { LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { BackButton } from "@/components/ui/BackButton";
import { Nav } from "@/components/ui/common/Nav";
import { useEffect, useState } from "react";
import { Loading } from "@/components/ui/common/Loading";
import Markdown from "marked-react";

export function PrivacyPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleClickLogout = () => {
    setIsLoading(true);

    setTimeout(() => {
      logout();
    }, 200);
  };

  const getText = async () => {
    const response = await fetch("/docs/Privacy.md");
    const text = await response.text();
    setContent(text);
  };

  useEffect(() => {
    getText();
  }, []);

  return (
    <div
      css={css({
        display: "flex",
        alignItems: "center",
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
        <div
          css={css({
            paddingTop: "1rem",
          })}
        >
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </div>
  );
}
