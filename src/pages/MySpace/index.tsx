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
import { DefaultModelOptions, UploadedModelOptions } from "./OptionsModel";
import { InputOptions } from "./OptionsInput";

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
