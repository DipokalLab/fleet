import { css } from "@emotion/react";

export function Column({
  children,
  gap = "0.25rem",
}: {
  children?: React.ReactNode;
  gap?: string;
}) {
  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "column",
        gap: gap,
      })}
    >
      {children}
    </div>
  );
}
