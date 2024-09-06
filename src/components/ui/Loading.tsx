import { css, keyframes } from "@emotion/react";
import { useColorMode, Progressbar } from "deventds2";
import { useState, useRef, useEffect } from "react";

export function LoadingScreen({
  progress,
  onLoaded,
}: {
  progress: number;
  onLoaded?: any;
}) {
  const [colorMode, setColorMode] = useColorMode();
  const [loadPercent, setLoadPercent] = useState(10);

  useEffect(() => {
    if (loadPercent >= 100) {
      try {
        onLoaded();
      } catch (error) {}
    }
  }, [loadPercent]);

  return (
    <div
      css={css({
        position: "fixed",
        top: 0,
        height: "100%",
        width: "100vw",
        backgroundColor: colorMode == "light" ? "#ffffff" : "#000000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: progress <= 100 ? "100%" : "0",
        visibility: progress <= 100 ? "visible" : "hidden",
        transition: ".5s",
        zIndex: 900,
      })}
    >
      <div
        css={css({
          width: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        })}
      >
        <LoadAnimation />
        <Progressbar percent={progress}></Progressbar>
      </div>
    </div>
  );
}

const animateFleet = keyframes`
  0% {
    transform: translate(-20px,0);
  }

  30% {
    transform: translate(0,0);
  }

  60% {
    transform: translate(0,0);
  }

  100% {
    transform: translate(30px,0);
  }
`;

function LoadAnimation() {
  const dotSize = "24px";
  return (
    <div
      css={css({
        position: "relative",
      })}
    >
      <div
        css={css({
          position: "relative",
          top: 0,
          left: 0,
          width: dotSize,
          height: dotSize,
          backgroundColor: "#4c4c4f",
          borderRadius: "100px",
        })}
      ></div>

      <div
        css={css({
          position: "absolute",
          top: "16px",
          left: 0,
          width: "18px",
          height: "5px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          animation: `${animateFleet} 2s ease infinite`,
        })}
      ></div>

      <div
        css={css({
          position: "absolute",
          top: "8px",
          left: 0,
          width: "12px",
          height: "5px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          animation: `${animateFleet} 3s ease infinite`,
          animationDelay: "0.23s",
        })}
      ></div>

      <div
        css={css({
          position: "absolute",
          top: "-1px",
          left: 0,
          width: "18px",
          height: "7px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          animation: `${animateFleet} 1.2s ease infinite`,
          animationDelay: "0.43s",
        })}
      ></div>
    </div>
  );
}

const ProgressTopStyle = css({
  width: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
});
