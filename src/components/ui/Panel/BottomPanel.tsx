import { css } from "@emotion/react";
import { BORDER_COLOR } from "../../../theme/color";
import { useEffect, useRef, useState } from "react";
import { OTHER_TOP_PADDING } from "./TopPanel";

export function BottomPanel({
  children,
  isOpen = false,
}: {
  children?: React.ReactNode;
  isOpen?: boolean;
}) {
  const [panelHeight, setPanelHeight] = useState(250);

  return (
    <div
      css={css({
        display: "flex",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: panelHeight,
        backgroundColor: "#dcdce380",
        backdropFilter: "blur(23px)",
        borderTop: `1px solid ${BORDER_COLOR}`,
        zIndex: 300,

        transition: ".2s",
        transform: isOpen
          ? "translate(0px, 0px)"
          : `translate(0px, ${panelHeight + 32}px)`,
      })}
    >
      <div
        css={css({
          padding: "1rem",
          width: "100%",
        })}
      >
        {children}
      </div>
    </div>
  );
}
