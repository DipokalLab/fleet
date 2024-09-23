import { css, keyframes } from "@emotion/react";
import { LoaderCircle } from "lucide-react";

const rotate = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

export function Loading() {
  return (
    <LoaderCircle
      css={css({
        width: "14px",
        height: "14px",
        animation: `${rotate} 2s linear infinite`,
      })}
    />
  );
}
