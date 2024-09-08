import { css } from "@emotion/react";
import { SUBTITLE_COLOR } from "../../theme/color";

export function ModelBox({
  url,
  onClick,
  tag,
}: {
  url?: string;
  onClick?: any;
  tag?: string;
}) {
  return (
    <div
      onClick={onClick}
      css={css({
        width: "5rem",
        height: "5rem",
        backgroundColor: "#ffffff",
        borderRadius: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.75rem",
        color: SUBTITLE_COLOR,
        fontWeight: "600",
        cursor: "pointer",
        border: "0.1rem solid #ffffff",
        transition: "0.2s",
        ":hover": {
          border: "0.1rem solid #3b82f6",
        },
      })}
    >
      {tag}
    </div>
  );
}
