import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Canvas, ThreeElements, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { EntryScene } from "../components/three/Scene";
import { Space } from "../components/three/space/Space";
import { useControls } from "leva";
import { LoadingScreen } from "../components/ui/Loading";
import { LeftPanel } from "../components/ui/Menu/LeftPanel";

function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => (meshRef.current.rotation.x += delta));

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export function MySpace() {
  const [loadPercent, setLoadPercent] = useState(10);
  const [isLeftPanelLoad, setIsLeftPanelLoad] = useState(false);

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
      <LeftPanel isLoaded={isLeftPanelLoad}>sdf</LeftPanel>
      <EntryScene>
        <Space></Space>
      </EntryScene>
    </>
  );
}
