import { css } from "@emotion/react";

export function Row({
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
        flexDirection: "row",
        gap: gap,
        overflow: "scroll",
      })}
    >
      {children}
    </div>
  );
}
