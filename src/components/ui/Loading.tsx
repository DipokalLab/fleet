import { css } from "@emotion/react";
import { useColorMode, Progressbar } from "deventds2";
import { useState, useRef, useEffect } from "react";

export function LoadingScreen({ progress }: { progress: number }) {
  const [colorMode, setColorMode] = useColorMode();

  const [isLoading, setIsLoading] = useState(false);
  const [loadPercent, setLoadPercent] = useState(10);

  const intervalRef: any = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    if (loadPercent > 110) {
      setIsLoading(false);
      clearInterval(intervalRef.current);
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
        <Progressbar percent={progress}></Progressbar>
      </div>
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
