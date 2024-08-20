import { css } from "@emotion/react";
import { SUBTITLE_COLOR } from "../../../theme/color";

export function SubTitle({ children }: { children?: React.ReactNode }) {
  return (
    <p
      css={css({
        margin: 0,
        color: SUBTITLE_COLOR,
        fontSize: "0.75rem",
        fontWeight: "600",
      })}
    >
      {children}
    </p>
  );
}

export function Title({ children }: { children?: React.ReactNode }) {
  return (
    <p
      css={css({
        margin: 0,
        color: SUBTITLE_COLOR,
        fontSize: "0.9rem",
        fontWeight: "600",
      })}
    >
      {children}
    </p>
  );
}