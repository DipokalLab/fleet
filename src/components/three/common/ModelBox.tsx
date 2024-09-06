import { css } from "@emotion/react";

export function ModelBox({ url }: { url?: string }) {
  return (
    <div
      css={css({
        width: "5rem",
        height: "5rem",
        backgroundColor: "#ffffff",
        borderRadius: "0.5rem",
      })}
    ></div>
  );
}
