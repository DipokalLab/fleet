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
import { Footer } from "@/components/landing/common/Footer";
import { Navbar } from "@/components/landing/common/Navbar";

import Markdown from "marked-react";
import { MarkdownContent } from "@/components/landing/docs/Markdown";

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
    <>
      <Navbar />

      <MarkdownContent content={content} />

      <Footer></Footer>
    </>
  );
}
