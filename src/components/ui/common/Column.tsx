import { css } from "@emotion/react";

export function Column({ children }: { children?: React.ReactNode }) {
  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
      })}
    >
      {children}
    </div>
  );
}
