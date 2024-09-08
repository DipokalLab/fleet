import { css } from "@emotion/react";

export function InputGroup({ children }: { children?: React.ReactNode }) {
  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "row",
        gap: "0.25rem",
        justifyContent: "space-between",
      })}
    >
      {children}
    </div>
  );
}
