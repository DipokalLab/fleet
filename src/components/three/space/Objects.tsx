import {
  ObjectMap,
  ThreeElements,
  useFrame,
  useLoader,
} from "@react-three/fiber";
import { useObjectsStore } from "../../../states/objects";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OptionPanelContext } from "../../../context/OptionPanelContext";
import { GLTF, GLTFLoader } from "three-stdlib";
import { useObject } from "../../../hooks/useObject";
import { useCursorStore } from "../../../states/cursor";
import {
  Html,
  Preload,
  TransformControls,
  useProgress,
} from "@react-three/drei";

export function Objects() {
  const { list } = useObjectsStore();

  const useObjectHooks = useObject();

  useEffect(() => {
    // useObjectHooks.create("https://fleet.cartesiancs.com/macbookpro_1.glb");
  }, []);

  return (
    <mesh>
      {list.map((objectItem) => (
        <Object
          userData={{
            id: objectItem.id,
            url: `${objectItem.url}?id=${objectItem.id}`,
          }}
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
  const cursorStore = useCursorStore();
  const objectStore = useObjectsStore();

  const [mode, setMode] = useState<"translate" | "scale" | "rotate">(
    "translate"
  );
  const [selected, setSelected] = useState(false);

  const editMode = {
    default: "translate",
    positionChange: "translate",
    rotationChange: "rotate",
    scaleChange: "scale",
  };

  const { isOpenOptionPanel, switchOpenOptionPanel, targetId } =
    useContext(OptionPanelContext);

  const controlsRef: any = useRef();

  const handleClick = () => {
    if (isActive == false) {
      cursorStore.changeType("positionChange");
    }
    setSelected(true);
    switchOpenOptionPanel(true, props.userData.id);
    setIsActive((active) => true);
  };

  const handleChange = (e) => {
    try {
      let position = controlsRef.current.object.position;
      let rotation = controlsRef.current.object.rotation;
      let scale = controlsRef.current.object.scale;

      const index = objectStore.list.findIndex((object) => {
        return object.id == props.userData.id;
      });

      let temp = objectStore.list;

      temp[index].position.x = position.x;
      temp[index].position.y = position.y;
      temp[index].position.z = position.z;

      temp[index].rotation.x = rotation.x;
      temp[index].rotation.y = rotation.y;
      temp[index].rotation.z = rotation.z;

      temp[index].scale.x = scale.x;
      temp[index].scale.y = scale.y;
      temp[index].scale.z = scale.z;

      objectStore.updateObject([...temp]);
    } catch (error) {}
  };

  useEffect(() => {
    const tempMode: any = editMode[cursorStore.type];
    setMode(tempMode);
  }, [cursorStore.type]);

  return (
    <>
      <TransformControls
        ref={controlsRef}
        object={meshRef}
        mode={mode}
        enabled={targetId == props.userData.id}
        onMouseUp={handleChange}
      >
        <mesh onClick={handleClick} {...props} ref={meshRef}>
          <primitive object={gltf.scene} />
          <meshStandardMaterial color={isActive ? "black" : "orange"} />
        </mesh>
      </TransformControls>

      {/* {isActive && (
        <>
          <MoveableDirection targetId={props.userData.id} />
        </>
      )} */}
    </>
  );
}

function MoveableDirection({ targetId }: { targetId: string }) {
  const cursorStore = useCursorStore();

  const { list } = useObjectsStore();
  const [listIndex, setListIndex] = useState(0);
  const weight = 0.1;

  const [bar, setBar] = useState({
    x: {
      isHover: false,
    },
    y: {
      isHover: false,
    },
    z: {
      isHover: false,
    },
  });

  const handleHoverIn = (d: string) => {
    console.log(d);
    setBar({
      ...bar,
      [d]: {
        isHover: true,
      },
    });
  };

  const handleHoverOut = () => {
    setBar({
      x: {
        isHover: false,
      },
      y: {
        isHover: false,
      },
      z: {
        isHover: false,
      },
    });
  };

  useEffect(() => {
    const index = list.findIndex((object) => {
      return object.id == targetId;
    });
    setListIndex(index);
  }, [targetId]);

  return (
    <mesh
      visible={cursorStore.type == "positionChange"}
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
        onPointerMove={() => handleHoverIn("x")}
        onPointerOut={handleHoverOut}
      >
        <meshStandardMaterial color={bar.x.isHover ? "#ffff00" : "#ff0000"} />
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
        onPointerMove={() => handleHoverIn("y")}
        onPointerOut={handleHoverOut}
      >
        <meshStandardMaterial color={bar.y.isHover ? "#ffff00" : "#00ff00"} />
      </mesh>

      <mesh
        visible
        position={new THREE.Vector3(0, 0, 0.5)}
        rotation={new THREE.Euler(0, 0, 0)}
        geometry={new THREE.BoxGeometry(weight, weight, 1)}
        onBeforeRender={function (renderer) {
          renderer.clearDepth();
        }}
        onPointerMove={() => handleHoverIn("z")}
        onPointerOut={handleHoverOut}
      >
        <meshStandardMaterial color={bar.z.isHover ? "#ffff00" : "#0000ff"} />
      </mesh>
    </mesh>
  );
}
