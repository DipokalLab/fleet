import { css } from "@emotion/react";
import { BORDER_COLOR } from "../../../theme/color";
import { useEffect, useRef, useState } from "react";

export function OptionPanel({
  children,
  isLoaded = false,
}: {
  children?: React.ReactNode;
  isLoaded?: boolean;
}) {
  const [isShow, setIsShow] = useState(false);
  const [panelWidth, setPanelWidth] = useState(250);

  useEffect(() => {
    if (isLoaded) {
      setIsShow(true);
    }
  }, [isLoaded]);

  return (
    <div
      css={css({
        display: "flex",
        position: "fixed",
        top: 0,
        right: 0,
        width: panelWidth,
        height: "100%",
        backgroundColor: "#f5f5fa50",
        backdropFilter: "blur(12px)",
        borderLeft: `1px solid ${BORDER_COLOR}`,
        zIndex: 300,
        padding: "1rem",
        transition: ".2s",
        transform: isLoaded
          ? "translate(0px, 0px)"
          : `translate(${panelWidth + 20}px, 0px)`,
      })}
    >
      {children}
    </div>
  );
}
