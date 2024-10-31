import { ThreeElements, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useCursorStore } from "../../../states/cursor";

export function Space({ children }: { children?: React.ReactNode }) {
  const cursorStore = useCursorStore();

  useThree(({ camera }) => {
    camera.rotation.set(
      THREE.MathUtils.degToRad(-20),
      THREE.MathUtils.degToRad(20),
      THREE.MathUtils.degToRad(3)
    );
  });

  return (
    <mesh castShadow>
      <OrbitControls makeDefault />

      {children}
    </mesh>
  );
}

function Wall(props: ThreeElements["mesh"]) {
  return (
    <mesh visible {...props} castShadow={true} receiveShadow={true}>
      <meshStandardMaterial color={"#ffffff"} />
    </mesh>
  );
}
