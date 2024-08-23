import { css } from "@emotion/react";
import { BORDER_COLOR } from "../../../theme/color";
import { useEffect, useRef, useState } from "react";
import { Button } from "deventds2";
import { CursorOptions } from "../options/CursorOption";

export const TOP_PANEL_HEIGHT = "3rem";
export const OTHER_TOP_PADDING = "4rem";

export function TopPanel() {
  return (
    <div
      css={css({
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: TOP_PANEL_HEIGHT,
        backgroundColor: "#f5f5fa50",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${BORDER_COLOR}`,
        zIndex: 400,
        justifyContent: "space-between",
        alignItems: "center",
      })}
    >
      <div css={css({ paddingLeft: "1rem" })}></div>
      <div css={css({ padding: "1rem 0rem" })}>
        <CursorOptions />
      </div>
      <div css={css({ paddingRight: "1rem" })}>
        <Button size="sm" color="blue">
          Publish
        </Button>
      </div>
    </div>
  );
}
