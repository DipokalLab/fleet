import { css } from "@emotion/react";

export function Row({
  children,
  gap = "0.25rem",
  justify = "unset",
}: {
  children?: React.ReactNode;
  gap?: string;
  justify?: string;
}) {
  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "row",
        gap: gap,
        overflow: "scroll",
        justifyContent: justify,
      })}
    >
      {children}
    </div>
  );
}

export function FullWidth({ children }: { children?: React.ReactNode }) {
  return (
    <div
      css={css({
        width: "100%",
      })}
    >
      {children}
    </div>
  );
}
