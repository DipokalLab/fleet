import { css } from "@emotion/react";

export function SideMenu({ children }: { children?: React.ReactNode }) {
  return (
    <div
      css={css({
        display: "flex",
        width: "210px",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        borderRight: `1px solid #ededf2`,
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
