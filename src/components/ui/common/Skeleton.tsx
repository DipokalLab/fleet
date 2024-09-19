import { css, keyframes } from "@emotion/react";

const skeletonFrame = keyframes({
  "0%": {
    backgroundColor: "#f2f2f5",
  },
  "50%": {
    backgroundColor: "#e9e9f2",
  },
  "100%": {
    backgroundColor: "#f2f2f5",
  },
});

export function Skeleton({
  width = 100,
  height = 100,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <div
      css={css({
        width: width,
        height: height,
        borderRadius: "0.5rem",
        animationName: skeletonFrame,
        animationDuration: "1.5s",
        animationIterationCount: "infinite",
      })}
    ></div>
  );
}
