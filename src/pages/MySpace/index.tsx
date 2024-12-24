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
import { css, Global } from "@emotion/react";
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
import {
  DefaultModelOptions,
  UploadedModelOptions,
} from "./components/OptionsModel";
import { InputOptions } from "./components/OptionsInput";
import { Trigger, TriggerModalContent } from "./components/Trigger";
import { EventModalContent } from "./components/Event";
import { usePageStore } from "@/states/page";
import { Tree } from "./components/Tree";
import { DragAndDropFileUpload } from "./components/DragFileUpload";
import { Mesh } from "./components/Mesh";
import { SpaceOptions } from "./components/SpaceOptions";

export function MySpace() {
  const toast = useToast();
  const { list, createObject, updateObject } = useObjectsStore();
  const { isPreview } = usePageStore();

  const [loadPercent, setLoadPercent] = useState(10);
  const [isLeftPanelLoad, setIsLeftPanelLoad] = useState(false);
  const { isOpenOptionPanel, switchOpenOptionPanel, targetId } =
    useContext(OptionPanelContext);
  const [isTriggerModalOpen, setIsTriggerModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const [isBottomPanelLoad, setIsBottomPanelLoad] = useState(false);
  const [loadLock, setLoadLock] = useState(true);

  const [triggerList, setTriggerList] = useState([]);
  const [activeTriggerId, setActiveTriggerId] = useState("");
  const intervalRef = useRef(null);

  const { uploadObject } = useUpload();
  const useObjectHooks = useObject();

  const handleLoad = () => {
    setTimeout(() => {
      setIsLeftPanelLoad(true);
      setLoadLock(false);
    }, 400);
  };

  const getTrigger = async () => {
    try {
      const getTriggers = await instance.get(
        `space/${location.pathname.split("/")[2]}`
      );

      const files = getTriggers.data.space.files.filter((file) => {
        return file.id == targetId;
      });

      const triggers = files[0].trigger;

      setTriggerList([...triggers]);
    } catch (error) {}
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

  const handleSendCreateTrigger = () => {
    setIsTriggerModalOpen(false);
    getTrigger();
  };

  const handleSendEditTrigger = () => {
    setIsEventModalOpen(false);
    getTrigger();
  };

  const handleClickEditTrigger = (id: string) => {
    setActiveTriggerId(id);
    setIsEventModalOpen(true);
  };

  useEffect(() => {
    getTrigger();
  }, [targetId]);

  useEffect(() => {
    if (loadPercent >= 100) {
      clearInterval(intervalRef.current);
      handleLoad();
    }
  }, [loadPercent]);

  useEffect(() => {
    if (loadLock == false) {
      if (isPreview) {
        setIsLeftPanelLoad(false);
        setIsBottomPanelLoad(false);
      } else {
        setIsLeftPanelLoad(true);
      }
    }
  }, [isPreview]);

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

      <DragAndDropFileUpload />

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

            <Mesh />

            <SpaceOptions />

            <Tree />
          </Column>
        </div>
      </LeftPanel>

      <OptionPanel isLoaded={isOpenOptionPanel}>
        <InputOptions targetId={targetId} onClosePanel={handleCloseOptionPanel}>
          <Column>
            <SubTitle>Event</SubTitle>

            <Trigger
              list={triggerList}
              onClickTrigger={() => setIsTriggerModalOpen(true)}
              onClickTriggerEdit={handleClickEditTrigger}
            />
          </Column>
        </InputOptions>
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

            <Row gap="1rem" overflow="visible">
              <UploadedModelOptions />
              <DefaultModelOptions />
            </Row>
          </Column>
        </FullWidth>
      </BottomPanel>

      <Modal
        isOpen={isTriggerModalOpen}
        onClose={() => setIsTriggerModalOpen(false)}
      >
        <TriggerModalContent
          triggerId={activeTriggerId}
          onSended={handleSendCreateTrigger}
        ></TriggerModalContent>
      </Modal>

      <Modal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
      >
        <EventModalContent
          triggerId={activeTriggerId}
          onSended={handleSendEditTrigger}
        ></EventModalContent>
      </Modal>

      <EntryScene>
        <Space></Space>
      </EntryScene>
    </>
  );
}
