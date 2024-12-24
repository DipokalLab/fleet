import { css } from "@emotion/react";
import { BORDER_COLOR } from "../../../theme/color";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, Input, Modal, useToast } from "deventds2";
import { CursorOptions } from "../options/CursorOption";
import { Description, Title } from "../common/Text";
import { Column } from "../common/Column";
import { ClipboardList, Ellipsis, House, Settings2 } from "lucide-react";
import { useNavigate } from "react-router";
import instance from "../../../api/axios";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { OptionPanelContext } from "@/context/OptionPanelContext";
import { usePageStore } from "@/states/page";
import { Row } from "../common/Row";
import { useSpaceStore } from "@/states/space";

export const TOP_PANEL_HEIGHT = "3rem";
export const OTHER_TOP_PADDING = "4rem";

const breakpoints = [768];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export function TopPanel() {
  const { isPreview } = usePageStore();

  const toast = useToast();
  const { switchIsPreview } = usePageStore();

  const navigate = useNavigate();
  const IconSize = "1.125rem";

  const [isShow, setIsShow] = useState(true);

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const { setOptions, options } = useSpaceStore();

  const [isMobileShow, setIsMobileShow] = useState(false);

  const { isOpenOptionPanel, switchOpenOptionPanel, targetId } =
    useContext(OptionPanelContext);

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
      setOptions({
        title: getSpace.data.space.title,
        isPublic: String(getSpace.data.space.isPublic),
        backgroundColor: getSpace.data.space.backgroundColor,
      });

      console.log(getSpace);

      console.log(getSpace.data.space.isPublic);
    } catch (error) {}
  };

  const setSpaceTitle = async (title: string) => {
    try {
      const spaceId = location.pathname.split("/")[2];
      const makePublic = await instance.put(`space`, {
        id: spaceId,
        title: title,
        isPublic: options.isPublic,
        backgroundColor: options.backgroundColor,
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
        title: options.title,
        isPublic: "true",
        backgroundColor: options.backgroundColor,
      });

      toast.message({
        text: "Successfully released.",
      });

      setOptions({
        title: options.title,
        isPublic: "true",
        backgroundColor: options.backgroundColor,
      });
    } catch (error) {}
  };

  const handleChangeTitle = (e) => {
    try {
      // NOTE: 쓰로틀링 업데이트 적용

      setOptions({
        title: e.target.value,
        isPublic: options.isPublic,
        backgroundColor: options.backgroundColor,
      });

      debouncedSpaceTitle(e.target.value);
    } catch (error) {}
  };

  const copyClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.message({
          text: "Copied to clipboard",
        });
      })
      .catch((err) => {
        console.error("Failed to copy");
      });
  };

  const handleClickClipboardLink = () => {
    const text = `${location.origin}/space/${location.pathname.split("/")[2]}`;

    copyClipboard(text);

    const embed = ` <iframe src='https://my.spline.design/glasseffectcopy-1abf110d8b022625e5bc21697c792761/' frameborder='0' width='100%' height='100%'></iframe>`;
  };

  const handleClickClipboardEmbed = () => {
    const embed = ` <iframe src='${location.origin}/space/${
      location.pathname.split("/")[2]
    }' frameborder='0' width='100%' height='100%'></iframe>`;

    copyClipboard(embed);
  };

  const handleClickPreview = () => {
    setIsShow(false);
    switchOpenOptionPanel(false, "");
    switchIsPreview(true);
  };

  const handleStopPreview = () => {
    setIsShow(true);

    switchIsPreview(false);
  };

  const handleClickHome = () => {
    location.href = "/";
  };

  const handleClickMobileTopView = () => {
    setIsMobileShow(true);
  };

  useEffect(() => {
    getSpaceInfo();
  }, []);

  return (
    <>
      <div
        css={css({
          display: "flex",
          transition: ".5s",
          transform: isShow ? "translate(0px, 0px)" : `translate(0px, -4.5rem)`,
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
            value={options.title}
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
        <div
          css={css({
            padding: "0rem 0rem",
            [mq[0]]: {
              display: "none",
            },
          })}
        >
          <CursorOptions />
        </div>
        <div
          css={css({
            paddingRight: "1rem",
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            [mq[0]]: {
              display: "none",
            },
          })}
        >
          <Button size="sm" color="light" onClick={handleClickPreview}>
            Preview
          </Button>

          <Button size="sm" color="blue" onClick={handleClickPublishButton}>
            Publish
          </Button>
        </div>
      </div>

      <div
        onClick={handleClickMobileTopView}
        css={css({
          display: "none",
          position: "fixed",
          cursor: "pointer",
          zIndex: 800,
          [mq[0]]: {
            display: "flex",
            top: "3.5rem",
            right: "0.5rem",
          },
        })}
      >
        <Ellipsis />
      </div>

      <Modal isOpen={isMobileShow} onClose={() => setIsMobileShow(false)}>
        <Column gap="0.5rem">
          <CursorOptions />
          <Row>
            <Button size="sm" color="light" onClick={handleClickPreview}>
              Preview
            </Button>

            <Button size="sm" color="blue" onClick={handleClickPublishButton}>
              Publish
            </Button>
          </Row>
        </Column>
      </Modal>

      {isPreview && (
        <div
          css={css({
            position: "fixed",
            top: "0.5rem",
            right: "0.5rem",
            zIndex: 999,
          })}
        >
          <Button size="sm" color="light" onClick={handleStopPreview}>
            Stop Preview
          </Button>
        </div>
      )}

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
          {options.isPublic == "true" && (
            <div
              css={css({
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "0.5rem",
                alignItems: "center",
              })}
            >
              <Input
                value={`${location.origin}/space/${
                  location.pathname.split("/")[2]
                }`}
                subfix={
                  <p
                    onClick={handleClickClipboardLink}
                    style={{
                      margin: 0,
                    }}
                  >
                    <ClipboardList
                      css={css({
                        height: "0.9rem",
                      })}
                    />
                  </p>
                }
              ></Input>
              <Button color="light" onClick={handleClickClipboardEmbed}>
                Copy Embed
              </Button>
            </div>
          )}

          {options.isPublic == "false" && (
            <Button color="blue" onClick={handleMakePublic}>
              Make Public
            </Button>
          )}
        </Column>
      </Modal>
    </>
  );
}
