import { ThreeElements, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useCursorStore } from "../../../states/cursor";

export function Space({ children }: { children?: React.ReactNode }) {
  return <mesh castShadow>{children}</mesh>;
}
