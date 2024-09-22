import { useContext, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Canvas, ThreeElements, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { EntryScene } from "../components/three/Scene";
import { Space } from "../components/three/space/Space";
import { useControls } from "leva";
import { LoadingScreen } from "../components/ui/Loading";
import { LeftPanel } from "../components/ui/Panel/LeftPanel";
import { OptionPanelContext } from "../context/OptionPanelContext";
import { OptionPanel } from "../components/ui/Panel/OptionPanel";
import { Input } from "../components/ui/common/Input";
import { InputGroup } from "../components/ui/common/InputGroup";
import { Description, SubTitle, Title } from "../components/ui/common/Text";
import { Column } from "../components/ui/common/Column";
import { useObjectsStore } from "../states/objects";
import { Button, Collapse, useToast } from "deventds2";
import { useUpload } from "../hooks/useUpload";
import { useObject } from "../hooks/useObject";
import { FullWidth, Row } from "../components/ui/common/Row";
import { css } from "@emotion/react";
import { CursorType, useCursorStore } from "../states/cursor";
import { TopPanel } from "../components/ui/Panel/TopPanel";
import { BottomPanel } from "../components/ui/Panel/BottomPanel";
import { PanelRightClose, X } from "lucide-react";
import { ACTION_ICON_COLOR, SUBTITLE_COLOR } from "../theme/color";
import { ModelBox } from "../components/ui/ModelBox";
import axios from "axios";
import { getCookie } from "../utils/cookie";
import instance from "../api/axios";
import { hosts } from "../api/hosts";
import { isLocal } from "../utils/isLocal";
import { TopProgressContext } from "../context/TopProgress";

export function MySpace() {
  const toast = useToast();
  const { list, createObject, updateObject } = useObjectsStore();

  const [loadPercent, setLoadPercent] = useState(10);
  const [isLeftPanelLoad, setIsLeftPanelLoad] = useState(false);
  const { isOpenOptionPanel, switchOpenOptionPanel, targetId } =
    useContext(OptionPanelContext);

  const [isBottomPanelLoad, setIsBottomPanelLoad] = useState(false);

  const intervalRef = useRef(null);

  const { uploadObject } = useUpload();

  const handleLoad = () => {
    setTimeout(() => {
      setIsLeftPanelLoad(true);
    }, 400);
  };

  const handleUpload = () => {
    uploadObject();
  };

  const handleClickDefaultModel = () => {
    setIsBottomPanelLoad((isOpen) => !isOpen);
  };

  const handleCloseOptionPanel = () => {
    switchOpenOptionPanel(false, targetId);
  };

  useEffect(() => {
    if (loadPercent >= 100) {
      clearInterval(intervalRef.current);
      handleLoad();
    }
  }, [loadPercent]);

  useEffect(() => {
    updateObject([]);
    intervalRef.current = setInterval(() => {
      setLoadPercent((percent) => percent + 60);
    }, 400);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      <LoadingScreen onLoaded={handleLoad} progress={loadPercent} />

      <TopPanel />

      <LeftPanel isLoaded={isLeftPanelLoad}>
        <div
          css={css({
            width: "100%",
          })}
        >
          <Column gap="0.5rem">
            <Column>
              <Title>FLEET v0.1</Title>
              <Button onClick={handleUpload} color="white">
                Upload
              </Button>
            </Column>

            <Column>
              <SubTitle>Action</SubTitle>
              <Button onClick={handleClickDefaultModel} color="white">
                Models
              </Button>
            </Column>
          </Column>
        </div>
      </LeftPanel>

      <OptionPanel isLoaded={isOpenOptionPanel}>
        <InputOptions
          targetId={targetId}
          onClosePanel={handleCloseOptionPanel}
        />
      </OptionPanel>

      <BottomPanel isOpen={isBottomPanelLoad}>
        <FullWidth>
          <Column justify="space-between">
            <Row justify="space-between">
              <Column>
                <Title>Models</Title>
                <Description>
                  A list of 3D models. Decorate your space.
                </Description>
              </Column>

              <Column>
                <X
                  css={css({ cursor: "pointer", color: SUBTITLE_COLOR })}
                  onClick={handleClickDefaultModel}
                />
              </Column>
            </Row>

            <Row gap="1rem">
              <UploadedModelOptions />
              <DefaultModelOptions />
            </Row>
          </Column>
        </FullWidth>
      </BottomPanel>
      <EntryScene>
        <Space></Space>
      </EntryScene>
    </>
  );
}

function DefaultModelOptions() {
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
    <Row gap="1rem">
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

function UploadedModelOptions() {
  const useObjectHooks = useObject();
  const [uploadedFiles, setUploadedFiles] = useState([]);

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

  useEffect(() => {
    getUploadedFiles();
  }, []);

  return (
    <Row gap="1rem">
      {uploadedFiles.map((item) => (
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

function InputOptions({
  targetId,
  onClosePanel,
}: {
  targetId?: string;
  onClosePanel?: any;
}) {
  const { list, updateObject } = useObjectsStore();
  const [optionInput, setOptionInput] = useState({
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    scale: {
      x: 1,
      y: 1,
      z: 1,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
  });
  const useObjectHooks = useObject();
  const { isOpenOptionPanel, switchOpenOptionPanel } =
    useContext(OptionPanelContext);

  const initValueOnOptions = () => {
    if (targetId == "") {
      return false;
    }

    const targetIndex = list.findIndex((item) => {
      return item.id == targetId;
    });

    setOptionInput({
      ...optionInput,
      ["position"]: {
        ...list[targetIndex]["position"],
      },
      ["scale"]: {
        ...list[targetIndex]["scale"],
      },
      ["rotation"]: {
        ...list[targetIndex]["rotation"],
      },
    });
  };

  const removeRequest = async () => {
    try {
      const deleteSpaceFile = await instance.delete("space/file", {
        data: {
          id: targetId,
        },
      });
    } catch (error) {}
  };

  const handleClickRemove = () => {
    removeRequest();
    useObjectHooks.remove(targetId);
    switchOpenOptionPanel(false, "");
  };

  const handleChangeOptionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [attribute, value] = e.target.name.split("_");

    const targetIndex = list.findIndex((item) => {
      return item.id == targetId;
    });

    list[targetIndex][attribute][value] = e.target.value;
    setOptionInput({
      ...optionInput,
      [attribute]: {
        [value]: e.target.value,
      },
    });

    updateObject([...list]);
  };

  useEffect(() => {
    initValueOnOptions();
  }, [targetId]);

  useEffect(() => {
    initValueOnOptions();
  }, [list]);

  return (
    <Column gap="0.5rem">
      <Column>
        <SubTitle>Position</SubTitle>
        <InputGroup>
          <Input
            prefix={<b>X</b>}
            name="position_x"
            onChange={handleChangeOptionInput}
            placeholder="1"
            value={optionInput.position.x}
          />
          <Input
            prefix={<b>Y</b>}
            name="position_y"
            onChange={handleChangeOptionInput}
            placeholder="1"
            value={optionInput.position.y}
          />
          <Input
            prefix={<b>Z</b>}
            name="position_z"
            onChange={handleChangeOptionInput}
            placeholder="1"
            value={optionInput.position.z}
          />
        </InputGroup>
      </Column>

      <Column>
        <SubTitle>Scale</SubTitle>
        <InputGroup>
          <Input
            prefix={<b>X</b>}
            name="scale_x"
            onChange={handleChangeOptionInput}
            placeholder="1"
            value={optionInput.scale.x}
          />
          <Input
            prefix={<b>Y</b>}
            name="scale_y"
            onChange={handleChangeOptionInput}
            placeholder="1"
            value={optionInput.scale.y}
          />
          <Input
            prefix={<b>Z</b>}
            name="scale_z"
            onChange={handleChangeOptionInput}
            placeholder="1"
            value={optionInput.scale.z}
          />
        </InputGroup>
      </Column>

      <Column>
        <SubTitle>Rotation</SubTitle>
        <InputGroup>
          <Input
            prefix={<b>X</b>}
            name="rotation_x"
            onChange={handleChangeOptionInput}
            placeholder="1"
            value={optionInput.rotation.x}
          />
          <Input
            prefix={<b>Y</b>}
            name="rotation_y"
            onChange={handleChangeOptionInput}
            placeholder="1"
            value={optionInput.rotation.y}
          />
          <Input
            prefix={<b>Z</b>}
            name="rotation_z"
            onChange={handleChangeOptionInput}
            placeholder="1"
            value={optionInput.rotation.z}
          />
        </InputGroup>
      </Column>

      <Column>
        <SubTitle>Option</SubTitle>

        <Button onClick={handleClickRemove} color="red">
          Remove
        </Button>
      </Column>

      <div
        css={css({
          color: ACTION_ICON_COLOR,
          bottom: 0,
          marginTop: "auto",
          marginBottom: "5rem",
        })}
      >
        <PanelRightClose
          css={css({
            cursor: "pointer",
          })}
          onClick={onClosePanel}
        />
      </div>
    </Column>
  );
}
