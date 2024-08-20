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

      <Wall
        position={new THREE.Vector3(0, 0, 0)}
        rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
        geometry={new THREE.BoxGeometry(4, 3, 0.2)}
      />

      <mesh position={new THREE.Vector3(0, 0.4, 0)}>
        <Wall
          position={new THREE.Vector3(0, 0, -1.5)}
          rotation={new THREE.Euler(0, 0, 0)}
          geometry={new THREE.BoxGeometry(4, 1, 0.2)}
        />

        <Wall
          position={new THREE.Vector3(2, 0, 0)}
          rotation={new THREE.Euler(0, Math.PI / 2, 0)}
          geometry={new THREE.BoxGeometry(3, 1, 0.2)}
        />
      </mesh>

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
