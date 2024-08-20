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
import { SubTitle, Title } from "../components/ui/common/Text";
import { Column } from "../components/ui/common/Column";
import { useObjectsStore } from "../states/objects";
import { Button, Collapse } from "deventds2";
import { useUpload } from "../hooks/useUpload";
import { useObject } from "../hooks/useObject";
import { Row } from "../components/ui/common/Row";
import { css } from "@emotion/react";
import { CursorType, useCursorStore } from "../states/cursor";

export function MySpace() {
  const [loadPercent, setLoadPercent] = useState(10);
  const [isLeftPanelLoad, setIsLeftPanelLoad] = useState(false);
  const { isOpenOptionPanel, switchOpenOptionPanel, targetId } =
    useContext(OptionPanelContext);

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

  useEffect(() => {
    if (loadPercent >= 100) {
      clearInterval(intervalRef.current);
      handleLoad();
    }
  }, [loadPercent]);

  useEffect(() => {
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
      <LeftPanel isLoaded={isLeftPanelLoad}>
        <div
          css={css({
            width: "100%",
          })}
        >
          <Column>
            <Column>
              <Title>FLEET v0.1</Title>
              <Button onClick={handleUpload} color="white">
                Upload
              </Button>
            </Column>

            <Column>
              <CursorOptions />
            </Column>
          </Column>
        </div>
      </LeftPanel>
      <OptionPanel isLoaded={isOpenOptionPanel}>
        <InputOptions targetId={targetId} />
      </OptionPanel>
      <EntryScene>
        <Space></Space>
      </EntryScene>
    </>
  );
}

function InputOptions({ targetId }: { targetId?: string }) {
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

  const handleClickRemove = () => {
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
    </Column>
  );
}

function CursorOptions() {
  const cursorStore = useCursorStore();

  const setButtonColor = (type: string): "light" | "black" => {
    if (cursorStore.type == type) {
      return "black";
    }
    return "light";
  };

  const handleClickButton = (type: CursorType) => {
    cursorStore.changeType(type);
  };

  return (
    <>
      <SubTitle>Cursor</SubTitle>

      <Row>
        <Button
          size="sm"
          color={setButtonColor("default")}
          onClick={() => handleClickButton("default")}
        >
          D
        </Button>
        <Button
          size="sm"
          color={setButtonColor("positionChange")}
          onClick={() => handleClickButton("positionChange")}
        >
          P
        </Button>
        <Button
          size="sm"
          color={setButtonColor("rotationChange")}
          onClick={() => handleClickButton("rotationChange")}
        >
          R
        </Button>
        <Button
          size="sm"
          color={setButtonColor("scaleChange")}
          onClick={() => handleClickButton("scaleChange")}
        >
          S
        </Button>
      </Row>
    </>
  );
}