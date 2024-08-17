import { ThreeElements, useLoader } from "@react-three/fiber";
import { useObjectsStore } from "../../../states/objects";
import { useContext, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OptionPanelContext } from "../../../context/OptionPanelContext";
import { GLTFLoader } from "three-stdlib";

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
          userData={{ id: objectItem.id }}
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
  const gltf = useLoader(
    GLTFLoader,
    "https://pub-fa4196a5c66c43a29f1ba72c16185bc2.r2.dev/macbookpro_1.glb"
  );

  const { isOpenOptionPanel, switchOpenOptionPanel } =
    useContext(OptionPanelContext);

  const handleClick = () => {
    switchOpenOptionPanel(!isActive, props.userData.id);
    setIsActive((active) => !active);
  };

  return (
    <mesh onClick={handleClick} {...props} ref={meshRef}>
      <primitive object={gltf.scene} />
      <meshStandardMaterial color={isActive ? "black" : "orange"} />
    </mesh>
  );
}
