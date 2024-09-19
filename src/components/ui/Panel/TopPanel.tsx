import { css } from "@emotion/react";
import { BORDER_COLOR } from "../../../theme/color";
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "deventds2";
import { CursorOptions } from "../options/CursorOption";
import { Description, Title } from "../common/Text";
import { Column } from "../common/Column";
import { House } from "lucide-react";
import { useNavigate } from "react-router";

export const TOP_PANEL_HEIGHT = "3rem";
export const OTHER_TOP_PADDING = "4rem";

export function TopPanel() {
  const navigate = useNavigate();
  const IconSize = "1.125rem";

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const handleClickPublishButton = () => {
    setIsPublishModalOpen(true);
  };

  const handleClickHome = () => {
    location.href = "/";
  };

  return (
    <>
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
        <div css={css({ paddingLeft: "1rem", alignItems: "center" })}>
          <button
            css={css({
              padding: "0.5rem 0.2rem",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            })}
            onClick={handleClickHome}
          >
            <House
              css={css({
                width: IconSize,
                height: IconSize,
              })}
            />
          </button>
        </div>
        <div css={css({ padding: "0rem 0rem" })}>
          <CursorOptions />
        </div>
        <div css={css({ paddingRight: "1rem" })}>
          <Button size="sm" color="blue" onClick={handleClickPublishButton}>
            Publish
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      >
        <Column gap="0.5rem">
          <Title>Publish</Title>
          <Description>asfasdf</Description>
        </Column>
      </Modal>
    </>
  );
}
