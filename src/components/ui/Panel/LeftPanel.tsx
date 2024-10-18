import { css } from "@emotion/react";
import { BORDER_COLOR } from "../../../theme/color";
import { useEffect, useRef, useState } from "react";
import { OTHER_TOP_PADDING } from "./TopPanel";
import { Settings2 } from "lucide-react";
import { Modal } from "deventds2";
import { usePageStore } from "@/states/page";

const breakpoints = [768];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export function LeftPanel({
  children,
  isLoaded = false,
}: {
  children?: React.ReactNode;
  isLoaded?: boolean;
}) {
  const [isShow, setIsShow] = useState(false);
  const [isMobileShow, setIsMobileShow] = useState(false);
  const [panelWidth, setPanelWidth] = useState(200);

  const handleClickMobileSetting = () => {
    setIsMobileShow(true);
  };

  useEffect(() => {
    if (isLoaded) {
      setIsShow(true);
    }
  }, [isLoaded]);

  return (
    <>
      <div
        onClick={handleClickMobileSetting}
        css={css({
          display: "none",
          position: "fixed",
          cursor: "pointer",
          zIndex: 800,
          [mq[0]]: {
            display: "flex",
            top: "3.5rem",
            left: "0.5rem",
          },
        })}
      >
        <Settings2 />
      </div>

      <div
        css={css({
          display: "flex",
          position: "fixed",
          top: 0,
          left: 0,
          width: panelWidth,
          height: "100%",
          backgroundColor: "#f5f5fa50",
          backdropFilter: "blur(12px)",
          borderRight: `1px solid ${BORDER_COLOR}`,
          zIndex: 300,
          transition: ".5s",
          transform: isLoaded
            ? "translate(0px, 0px)"
            : `translate(${-panelWidth - 32}px, 0px)`,

          [mq[0]]: {
            display: "none",
          },
        })}
      >
        <div
          css={css({
            padding: "1rem",
            width: "100%",
            paddingTop: OTHER_TOP_PADDING,
            overflow: "scroll",
            scrollbarWidth: "none",
          })}
        >
          {children}
        </div>
      </div>

      <Modal
        isOpen={isMobileShow}
        onClose={() => setIsMobileShow(false)}
        isScroll={true}
      >
        {children}
      </Modal>
    </>
  );
}
