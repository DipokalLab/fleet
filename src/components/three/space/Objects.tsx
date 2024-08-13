import { ThreeElements } from "@react-three/fiber";
import { useObjectsStore } from "../../../states/objects";
import { useContext, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OptionPanelContext } from "../../../context/OptionPanelContext";

export function Objects() {
  const { list, createObject } = useObjectsStore();

  useEffect(() => {
    createObject({
      id: String(Math.random()),
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
  }, []);

  return (
    <mesh>
      {list.map((objectItem) => (
        <Object
          position={
            new THREE.Vector3(
              objectItem.position.x,
              objectItem.position.y,
              objectItem.position.z
            )
          }
          scale={
            new THREE.Vector3(
              objectItem.scale.x,
              objectItem.scale.y,
              objectItem.scale.z
            )
          }
          rotation={
            new THREE.Euler(
              objectItem.rotation.x,
              objectItem.rotation.y,
              objectItem.rotation.z
            )
          }
        ></Object>
      ))}
    </mesh>
  );
}

function Object(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [isActive, setIsActive] = useState(false);

  const { isOpenOptionPanel, switchOpenOptionPanel } =
    useContext(OptionPanelContext);

  const handleClick = () => {
    switchOpenOptionPanel(!isActive);
    setIsActive((active) => !active);
  };

  return (
    <mesh onClick={handleClick} {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={isActive ? "black" : "orange"} />
    </mesh>
  );
}
