import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Canvas, ThreeElements, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { EntryScene } from "./components/three/Scene";
import { Space } from "./components/three/space/Space";
import { useControls } from "leva";
import { MySpace } from "./pages/MySpace/";
import { useColorMode } from "deventds2";

function App() {
  const [colorMode, setColorMode] = useColorMode();

  useEffect(() => {
    setColorMode("light");
  }, []);

  return (
    <>
      <MySpace></MySpace>
    </>
  );
}

export default App;
