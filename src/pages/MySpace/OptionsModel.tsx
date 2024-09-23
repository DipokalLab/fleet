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

export function UploadedModelOptions() {
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
