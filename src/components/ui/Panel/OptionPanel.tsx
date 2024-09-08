import { css } from "@emotion/react";
import { BORDER_COLOR } from "../../../theme/color";
import { useEffect, useRef, useState } from "react";
import { OTHER_TOP_PADDING } from "./TopPanel";

const breakpoints = [768];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

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
        transition: ".2s",
        transform: isLoaded
          ? "translate(0px, 0px)"
          : `translate(${panelWidth + 32}px, 0px)`,

        [mq[0]]: {
          bottom: 0,
          left: 0,
          top: "auto",
          width: "100%",
          overflowY: "scroll",
          height: panelWidth,
          borderLeft: `0px solid ${BORDER_COLOR}`,
          borderTop: `1px solid ${BORDER_COLOR}`,
          transform: isLoaded
            ? "translate(0px, 0px)"
            : `translate(0px, ${panelWidth + 32}px)`,
        },
      })}
    >
      <div
        css={css({
          padding: "1rem",
          width: "100%",
          paddingTop: OTHER_TOP_PADDING,

          [mq[0]]: {
            padding: "1rem",

            paddingTop: "1rem",
          },
        })}
      >
        {children}
      </div>
    </div>
  );
}
