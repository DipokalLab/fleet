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
import { Button, Collapse, useToast } from "deventds2";
import { useUpload } from "@/hooks/useUpload";
import { useObject } from "@/hooks/useObject";
import { FullWidth, Row } from "@/components/ui/common/Row";
import { css } from "@emotion/react";
import { CursorType, useCursorStore } from "@/states/cursor";
import { TopPanel } from "@/components/ui/Panel/TopPanel";
import { BottomPanel } from "@/components/ui/Panel/BottomPanel";
import { PanelRightClose, X } from "lucide-react";
import { ACTION_ICON_COLOR, SUBTITLE_COLOR } from "@/theme/color";
import { ModelBox } from "@/components/ui/ModelBox";
import { getCookie } from "@/utils/cookie";
import { hosts } from "@/api/hosts";
import { isLocal } from "@/utils/isLocal";
import { TopProgressContext } from "@/context/TopProgress";
import * as THREE from "three";
import axios from "axios";
import instance from "@/api/axios";

export function InputOptions({
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
