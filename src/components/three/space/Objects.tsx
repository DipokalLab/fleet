import { ObjectMap, ThreeElements, useLoader } from "@react-three/fiber";
import { useObjectsStore } from "../../../states/objects";
import { useContext, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OptionPanelContext } from "../../../context/OptionPanelContext";
import { GLTF, GLTFLoader } from "three-stdlib";
import { useObject } from "../../../hooks/useObject";

export function Objects() {
  const { list } = useObjectsStore();

  const useObjectHooks = useObject();

  useEffect(() => {
    useObjectHooks.create(
      "https://pub-fa4196a5c66c43a29f1ba72c16185bc2.r2.dev/macbookpro_1.glb"
    );
  }, []);

  return (
    <mesh>
      {list.map((objectItem) => (
        <Object
          userData={{ id: objectItem.id, url: objectItem.url }}
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
  const url: string = props.userData.url;
  const gltf = useLoader(GLTFLoader, url);

  const { isOpenOptionPanel, switchOpenOptionPanel } =
    useContext(OptionPanelContext);

  const handleClick = () => {
    switchOpenOptionPanel(!isActive, props.userData.id);
    setIsActive((active) => !active);
  };

  return (
    <>
      <mesh onClick={handleClick} {...props} ref={meshRef}>
        <primitive object={gltf.scene} />
        <meshStandardMaterial color={isActive ? "black" : "orange"} />
      </mesh>
      {isActive && (
        <>
          <MoveableDirection targetId={props.userData.id} />
        </>
      )}
    </>
  );
}

function MoveableDirection({ targetId }: { targetId: string }) {
  const { list } = useObjectsStore();
  const [listIndex, setListIndex] = useState(0);
  const weight = 0.2;

  useEffect(() => {
    const index = list.findIndex((object) => {
      return object.id == targetId;
    });
    setListIndex(index);
  }, [targetId]);

  return (
    <mesh
      position={
        new THREE.Vector3(
          list[listIndex].position.x,
          list[listIndex].position.y,
          list[listIndex].position.z
        )
      }
      scale={new THREE.Vector3(1, 1, 1)}
    >
      <mesh
        visible
        position={new THREE.Vector3(0.5, 0, 0)}
        rotation={new THREE.Euler(0, 0, 0)}
        geometry={new THREE.BoxGeometry(1, weight, weight)}
        renderOrder={9999}
        onBeforeRender={function (renderer) {
          renderer.clearDepth();
        }}
      >
        <meshStandardMaterial color={"#ff0000"} />
      </mesh>

      <mesh
        visible
        position={new THREE.Vector3(0, 0.5, 0)}
        rotation={new THREE.Euler(0, 0, 0)}
        geometry={new THREE.BoxGeometry(weight, 1, weight)}
        renderOrder={9999}
        onBeforeRender={function (renderer) {
          renderer.clearDepth();
        }}
      >
        <meshStandardMaterial
          color={"#00ff00"}
          depthTest={false}
          depthWrite={false}
        />
      </mesh>

      <mesh
        visible
        position={new THREE.Vector3(0, 0, 0.5)}
        rotation={new THREE.Euler(0, 0, 0)}
        geometry={new THREE.BoxGeometry(weight, weight, 1)}
        onBeforeRender={function (renderer) {
          renderer.clearDepth();
        }}
      >
        <meshStandardMaterial color={"#0000ff"} />
      </mesh>
    </mesh>
  );
}
