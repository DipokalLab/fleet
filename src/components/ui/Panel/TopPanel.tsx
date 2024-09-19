import { css } from "@emotion/react";
import { BORDER_COLOR } from "../../../theme/color";
import { useEffect, useRef, useState } from "react";
import { Button, Modal, useToast } from "deventds2";
import { CursorOptions } from "../options/CursorOption";
import { Description, Title } from "../common/Text";
import { Column } from "../common/Column";
import { House } from "lucide-react";
import { useNavigate } from "react-router";
import instance from "../../../api/axios";
import { useDebounce, useDebouncedCallback } from "use-debounce";

export const TOP_PANEL_HEIGHT = "3rem";
export const OTHER_TOP_PADDING = "4rem";

export function TopPanel() {
  const toast = useToast();

  const navigate = useNavigate();
  const IconSize = "1.125rem";

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [spaceInfo, setSpaceInfo] = useState({
    spaceTitle: "",
    isPublic: "false",
  });

  const debouncedSpaceTitle = useDebouncedCallback((value) => {
    setSpaceTitle(value);
  }, 1000);

  const handleClickPublishButton = () => {
    setIsPublishModalOpen(true);
  };

  const getSpaceInfo = async () => {
    try {
      const spaceId = location.pathname.split("/")[2];
      const getSpace = await instance.get(`space/${spaceId}`);
      setSpaceInfo({
        spaceTitle: getSpace.data.space.title,
        isPublic: getSpace.data.space.isPublic,
      });
    } catch (error) {}
  };

  const setSpaceTitle = async (title: string) => {
    try {
      const spaceId = location.pathname.split("/")[2];
      const makePublic = await instance.put(`space`, {
        id: spaceId,
        title: title,
        isPublic: spaceInfo.isPublic,
      });

      toast.message({
        text: "Successfully update",
      });
    } catch (error) {}
  };

  const handleMakePublic = async () => {
    try {
      const spaceId = location.pathname.split("/")[2];
      const makePublic = await instance.put(`space`, {
        id: spaceId,
        title: spaceInfo.spaceTitle,
        isPublic: "true",
      });

      toast.message({
        text: "Successfully released.",
      });

      setIsPublishModalOpen(false);
    } catch (error) {}
  };

  const handleChangeTitle = (e) => {
    try {
      // NOTE: 쓰로틀링 업데이트 적용
      setSpaceInfo({
        ...spaceInfo,
        ["spaceTitle"]: e.target.value,
      });

      debouncedSpaceTitle(e.target.value);
    } catch (error) {}
  };

  const handleClickHome = () => {
    location.href = "/";
  };

  useEffect(() => {
    getSpaceInfo();
  }, []);

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
        <div
          css={css({
            paddingLeft: "1rem",
            alignItems: "center",
            flexDirection: "row",
            display: "flex",
            gap: "0.75rem",
          })}
        >
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

          <input
            value={spaceInfo.spaceTitle}
            onChange={handleChangeTitle}
            css={css({
              width: "5rem",
              border: "none",
              backgroundColor: "transparent",
              outline: "none",
              fontSize: "0.9rem",
            })}
          ></input>
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
        <Column gap="1rem">
          <Column gap="0.5rem">
            <Title>Publish</Title>
            <Description>
              My space is published on the home feed screen with the user who
              has the link. Please click the "Make Public" button below.
            </Description>
          </Column>
          <Button color="blue" onClick={handleMakePublic}>
            Make Public
          </Button>
        </Column>
      </Modal>
    </>
  );
}
