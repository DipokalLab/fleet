import { Navbar, NavbarItem } from "deventds2";
import { Global, css } from "@emotion/react";
import { Button } from "deventds2";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { setCookie } from "../utils/cookie";
import { CircleCheck } from "lucide-react";

export function AuthDonePage() {
  const nativate = useNavigate();

  useEffect(() => {
    const urlSearch = new URLSearchParams(location.search);
    const token = urlSearch.get("token");

    setCookie("token", token);

    setTimeout(() => {
      location.href = "/app";
    }, 1000);
  }, []);

  return (
    <>
      <Global
        styles={css`
          body,
          html,
          #root {
            margin: 0;
            height: 100%;
            overflow: hidden;
          }
        `}
      />

      <div
        css={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        })}
      >
        <div
          css={css({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "300px",
            flexDirection: "column",
            gap: "1rem",
          })}
        >
          <CircleCheck
            css={css({
              color: "#30c73c",
              transform: "scale(2.0)",
            })}
          />
        </div>
      </div>
    </>
  );
}
