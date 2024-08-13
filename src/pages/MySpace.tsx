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
import { SubTitle } from "../components/ui/common/Text";
import { Column } from "../components/ui/common/Column";

export function MySpace() {
  const [loadPercent, setLoadPercent] = useState(10);
  const [isLeftPanelLoad, setIsLeftPanelLoad] = useState(false);
  const { isOpenOptionPanel, switchOpenOptionPanel } =
    useContext(OptionPanelContext);

  const intervalRef = useRef(null);

  const handleLoad = () => {
    setTimeout(() => {
      setIsLeftPanelLoad(true);
    }, 400);
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
      <LeftPanel isLoaded={isLeftPanelLoad}>FLEET</LeftPanel>
      <OptionPanel isLoaded={isOpenOptionPanel}>
        <Column>
          <SubTitle>Position</SubTitle>
          <InputGroup>
            <Input prefix={<b>X</b>} onChange={() => {}} placeholder="1" />
            <Input prefix={<b>Y</b>} onChange={() => {}} placeholder="1" />
            <Input prefix={<b>Z</b>} onChange={() => {}} placeholder="1" />
          </InputGroup>
        </Column>
      </OptionPanel>
      <EntryScene>
        <Space></Space>
      </EntryScene>
    </>
  );
}
