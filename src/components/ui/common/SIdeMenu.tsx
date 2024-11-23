import { css } from "@emotion/react";
import { Menu, Settings2 } from "lucide-react";
import { useState } from "react";

const breakpoints = [768];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export function SideMenu({ children }: { children?: React.ReactNode }) {
  const [isMobileShow, setIsMobileShow] = useState(false);
  const [panelWidth, setPanelWidth] = useState(210);

  const handleClickMobileSetting = () => {
    setIsMobileShow(true);
  };

  return (
    <>
      <div
        onClick={handleClickMobileSetting}
        css={css({
          display: "none",
          position: "fixed",
          cursor: "pointer",
          zIndex: 800,
          [mq[0]]: {
            display: "flex",
            top: "1rem",
            left: "1rem",
          },
        })}
      >
        <Menu />
      </div>

      <div
        css={css({
          display: "flex",
          width: "210px",
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          borderRight: `1px solid #ededf2`,

          [mq[0]]: {
            display: "none",
          },
        })}
      >
        <div
          css={css({
            display: "flex",
            width: "100%",
            padding: "1rem",
            flexDirection: "column",
            gap: "0.5rem",
          })}
        >
          {children}
        </div>
      </div>

      <div
        onClick={() => setIsMobileShow(false)}
        css={css({
          display: isMobileShow ? "flex" : "none",
          width: "100%",
          height: "100%",
          position: "fixed",
          transition: ".5s",
        })}
      ></div>

      <div
        css={css({
          display: "flex",
          width: "210px",
          height: "100%",
          position: "fixed",
          backgroundColor: "#f5f5fa50",
          backdropFilter: "blur(12px)",
          transition: ".5s",
          zIndex: 999,
          top: 0,
          left: 0,
          borderRight: `1px solid #ededf2`,
          transform: isMobileShow
            ? "translate(0px, 0px)"
            : `translate(${-panelWidth - 32}px, 0px)`,
        })}
      >
        <div
          css={css({
            display: "flex",
            width: "100%",
            padding: "1rem",
            flexDirection: "column",
            gap: "0.5rem",
          })}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export function SideMenuItem({
  children,
  onClick,
}: {
  children?: React.ReactNode;
  onClick?: any;
}) {
  return (
    <div
      onClick={onClick}
      css={css({
        display: "flex",
        borderRadius: "0.5rem",
        backgroundColor: "#ffffff",
        transition: "0.2s",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#ededf2",
        },
      })}
    >
      <div
        css={css({
          display: "flex",

          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.5rem 0.25rem",
        })}
      >
        <b
          css={css({
            fontSize: "14px",
            fontWeight: "500",
          })}
        >
          {children}
        </b>
      </div>
    </div>
  );
}
