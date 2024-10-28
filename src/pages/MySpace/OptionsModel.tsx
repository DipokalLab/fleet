import { useContext, useEffect, useRef, useState } from "react";
import { Canvas, ThreeElements, useFrame, useThree } from "@react-three/fiber";
import { EntryScene } from "@/components/three/Scene";
import { Space } from "@/components/three/space/Space";
import { useControls } from "leva";
import { LoadingScreen } from "@/components/ui/Loading";
import { LeftPanel } from "@/components/ui/Panel/LeftPanel";
import { OptionPanelContext } from "@/context/OptionPanelContext";
import { OptionPanel } from "@/components/ui/Panel/OptionPanel";
import { Input } from "@/components/ui/common/Input";
import { InputGroup } from "@/components/ui/common/InputGroup";
import { Description, SubTitle, Title } from "@/components/ui/common/Text";
import { Column } from "@/components/ui/common/Column";
import { useObjectsStore } from "@/states/objects";
import { Button, Collapse, Modal, useToast } from "deventds2";
import { useUpload } from "@/hooks/useUpload";
import { useObject } from "@/hooks/useObject";
import { FullWidth, Row } from "@/components/ui/common/Row";
import { css } from "@emotion/react";
import { CursorType, useCursorStore } from "@/states/cursor";
import { TopPanel } from "@/components/ui/Panel/TopPanel";
import { BottomPanel } from "@/components/ui/Panel/BottomPanel";
import { Ellipsis, PanelRightClose, Plus, X } from "lucide-react";
import { ACTION_ICON_COLOR, SUBTITLE_COLOR } from "@/theme/color";
import { ModelBox } from "@/components/ui/ModelBox";
import { getCookie } from "@/utils/cookie";
import { hosts } from "@/api/hosts";
import { isLocal } from "@/utils/isLocal";
import { TopProgressContext } from "@/context/TopProgress";
import * as THREE from "three";
import axios from "axios";
import instance from "@/api/axios";
import {
  Dropdown,
  DropdownButton,
  DropdownContext,
  DropdownItem,
} from "@/components/ui/common/Dropdown";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export function UploadedModelOptions() {
  const useObjectHooks = useObject();
  const toast = useToast();

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isEditName, setIsEditName] = useState(false);
  const [targetFileId, setTargetFileId] = useState("");
  const [updateFileName, setUpdateFileName] = useState("");

  const getUploadedFiles = async () => {
    try {
      const getFiles = await instance.get("file");
      setUploadedFiles([...getFiles.data.files]);
    } catch (error) {}
  };

  const handleClickBox = async (url: string, fileId: string) => {
    try {
      const saveSpace = await instance.post("space/file", {
        spaceId: location.pathname.split("/")[2],
        fileId: fileId,
      });

      useObjectHooks.create(
        `${url}?id=${Math.random()}`,
        saveSpace.data.spaceFile.id,
        {
          px: 0,
          py: 0,
          pz: 0,
          sx: 1,
          sy: 1,
          sz: 1,
          rx: 0,
          ry: 0,
          rz: 0,
        }
      );
    } catch (error) {}
  };

  const sendFileName = async () => {
    try {
      const editFilename = await instance.put(`file`, {
        fileId: targetFileId,
        title: updateFileName,
      });

      toast.message({
        text: "Successfully updated",
      });

      getUploadedFiles();
    } catch (error) {
      toast.message({
        text: "update fail",
      });
    }
    setIsEditName(false);
  };

  const handleClickDropdownEdit = (fileId: string) => {
    const fileName = uploadedFiles.filter((item) => {
      return item.id == fileId;
    })[0].fileTitle;

    setTargetFileId(fileId);
    setIsEditName(true);
    setUpdateFileName(fileName);
  };

  const handleChangeName = (e) => {
    setUpdateFileName(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendFileName();
    }
  };

  useEffect(() => {
    getUploadedFiles();
  }, []);

  return (
    <div
      css={css({
        display: "grid",
        overflowY: "scroll",
        gridTemplateColumns: "repeat(2, 1fr)",
        [mq[0]]: {
          gridTemplateColumns: "repeat(2, 1fr)",
        },
        [mq[1]]: {
          gridTemplateColumns: "repeat(4, 1fr)",
        },
        [mq[2]]: {
          gridTemplateColumns: "repeat(6, 1fr)",
        },
        [mq[3]]: {
          gridTemplateColumns: "repeat(8, 1fr)",
        },
        [mq[4]]: {
          gridTemplateColumns: "repeat(10, 1fr)",
        },
        width: "100%",
        height: "180px",
        gap: "1rem",
      })}
    >
      {uploadedFiles.map((item) => (
        <div
          css={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          })}
        >
          <ModelBox
            onClick={() =>
              handleClickBox(
                `${isLocal() ? hosts.dev : hosts.prod}/${item.fileUrl}`,
                item.id
              )
            }
            url={`${isLocal() ? hosts.dev : hosts.prod}/${item.fileUrl}`}
            tag={item.fileTitle}
          />
          <div
            css={css({
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "5rem",
            })}
          >
            {isEditName && item.id == targetFileId ? (
              <input
                value={updateFileName}
                onChange={handleChangeName}
                onKeyDown={handleKeyDown}
                css={css({
                  width: "100%",
                  border: "none",
                  backgroundColor: "#ffffff",
                  outline: "none",
                  fontSize: "0.75rem",
                })}
              ></input>
            ) : (
              <span
                css={css({
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  fontSize: "0.75rem",
                })}
              >
                {item.fileTitle}
              </span>
            )}

            <Dropdown title="test" actionComponent={<EditButton />}>
              <DropdownItem>
                <DropdownButton
                  onClicked={() => {
                    handleClickDropdownEdit(item.id);
                  }}
                >
                  Edit
                </DropdownButton>
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DefaultModelOptions() {
  const useObjectHooks = useObject();
  const [defaultFiles, setDefaultFiles] = useState([]);

  const handleClickBox = async (url: string, fileId: string) => {
    const saveSpace = await instance.post("space/file", {
      spaceId: location.pathname.split("/")[2],
      fileId: fileId,
    });

    useObjectHooks.create(
      `${url}?id=${Math.random()}`,
      saveSpace.data.spaceFile.id,
      {
        px: 0,
        py: 0,
        pz: 0,
        sx: 1,
        sy: 1,
        sz: 1,
        rx: 0,
        ry: 0,
        rz: 0,
      }
    );
  };

  const getDefaultFiles = async () => {
    try {
      const getFiles = await instance.get("file/default");
      setDefaultFiles(getFiles.data.files);
    } catch (error) {}
  };

  useEffect(() => {
    getDefaultFiles();
  }, []);

  return (
    <Row gap="1rem" overflow="scroll">
      {defaultFiles.map((item) => (
        <ModelBox
          onClick={() =>
            handleClickBox(
              `${isLocal() ? hosts.dev : hosts.prod}/${item.fileUrl}`,
              item.id
            )
          }
          url={`${isLocal() ? hosts.dev : hosts.prod}/${item.fileUrl}`}
          tag={item.fileTitle}
        />
      ))}
    </Row>
  );
}

export function EditButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <div
      css={css({
        display: "flex",
        borderRadius: "100px",
        transition: "0.2s",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        marginLeft: "0.25rem",

        ":hover": {
          backgroundColor: "#ededf2",
        },
      })}
    >
      <Ellipsis
        css={css({
          width: "0.75rem",
          height: "0.75rem",
        })}
      />
    </div>
  );
}
