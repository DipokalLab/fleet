import { css } from "@emotion/react";
import { createContext, useContext, useState } from "react";

export const TopProgressContext = createContext(undefined);

export function TopProgressProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [progress, setProgress] = useState(0);

  const updateProgress = (value: number) => {
    setProgress(value);
  };

  const values: any = { updateProgress };
  return (
    <TopProgressContext.Provider value={values}>
      <div
        css={css({
          position: "fixed",
          zIndex: 999999,
          top: "0",
          left: 0,
          height: "2px",
          backgroundColor: "#000000",
          width: `${progress}%`,
          transition: "0.2s",
          opacity: progress >= 100 ? "0%" : "100%",
        })}
      ></div>
      {children}
    </TopProgressContext.Provider>
  );
}
