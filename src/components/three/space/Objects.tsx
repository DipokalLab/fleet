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
import { useFBX } from "@react-three/drei";

import { useObject } from "../../../hooks/useObject";
import { useCursorStore } from "../../../states/cursor";
import {
  Html,
  Preload,
  TransformControls,
  useProgress,
} from "@react-three/drei";
import instance from "../../../api/axios";
import { isLocal } from "../../../utils/isLocal";
import { hosts } from "../../../api/hosts";
import { usePageStore } from "@/states/page";
import { RigidBody } from "@react-three/rapier";

export function Objects() {
  const { list } = useObjectsStore();

  const useObjectHooks = useObject();

  const getFiles = async () => {
    const getSpace = await instance.get(
      `space/${location.pathname.split("/")[2]}`
    );

    const files = getSpace.data.space.files;

    for (let index = 0; index < files.length; index++) {
      const element = files[index];

      console.log(element);

      switch (element.type) {
        case "MODEL":
          useObjectHooks.create(
            `${isLocal() ? hosts.dev : hosts.prod}/${
              element.file.fileUrl
            }?id=${Math.random()}`,
            element.id,
            {
              name: element.name,
              enablePhysics: element.enablePhysics,
              shadowCast: element.shadowCast,
              shadowReceive: element.shadowReceive,
              type: element.type,
              px: element.px,
              py: element.py,
              pz: element.pz,
              sx: element.sx,
              sy: element.sy,
              sz: element.sz,
              rx: element.rx,
              ry: element.ry,
              rz: element.rz,
            }
          );
          break;

        case "BOX":
          useObjectHooks.create("", element.id, {
            name: element.name,
            enablePhysics: element.enablePhysics,
            type: element.type,
            shadowCast: element.shadowCast,
            shadowReceive: element.shadowReceive,
            px: element.px,
            py: element.py,
            pz: element.pz,
            sx: element.sx,
            sy: element.sy,
            sz: element.sz,
            rx: element.rx,
            ry: element.ry,
            rz: element.rz,
          });
          break;

        case "MESH":
          useObjectHooks.create(
            `${isLocal() ? hosts.dev : hosts.prod}/${
              element.file.fileUrl
            }?id=${Math.random()}`,
            element.id,
            {
              name: element.name,
              enablePhysics: element.enablePhysics,
              shadowCast: element.shadowCast,
              shadowReceive: element.shadowReceive,
              type: element.type,
              px: element.px,
              py: element.py,
              pz: element.pz,
              sx: element.sx,
              sy: element.sy,
              sz: element.sz,
              rx: element.rx,
              ry: element.ry,
              rz: element.rz,
            }
          );
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <mesh>
      {list.map((objectItem) => (
        <Suspense fallback={<mesh></mesh>}>
          <Object
            userData={{
              id: objectItem.id,
              url: `${objectItem.url}`,
              isRemoved: objectItem.isRemoved,
              enablePhysics: objectItem.enablePhysics,
              type: objectItem.type,
              shadow: {
                cast: objectItem.shadow.cast,
                receive: objectItem.shadow.receive,
              },
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
        </Suspense>
      ))}
    </mesh>
  );
}

function Object(props: ThreeElements["mesh"]) {
  const { isPreview } = usePageStore();

  const meshRef = useRef<THREE.Mesh>(null!);
  const [isActive, setIsActive] = useState(false);
  const url: string = props.userData.url;
  const [gltf, setGltf] = useState<any>(
    ["MODEL", "MESH"].includes(props.userData.type)
      ? useLoader(GLTFLoader, url)
      : ""
  );
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

  const showAxis = isPreview
    ? false
    : targetId == props.userData.id
    ? true
    : false;

  const controlsRef: any = useRef();

  const updateObject = async (element) => {
    try {
      const editSpace = await instance.put("space/file", {
        id: props.userData.id,
        px: element.px,
        py: element.py,
        pz: element.pz,
        sx: element.sx,
        sy: element.sy,
        sz: element.sz,
        rx: element.rx,
        ry: element.ry,
        rz: element.rz,
      });
    } catch (error) {}
  };

  const handleClick = () => {
    if (isPreview) {
      return false;
    }

    if (isActive == false) {
      cursorStore.changeType("positionChange");
    }
    setSelected(true);
    switchOpenOptionPanel(true, props.userData.id);
    setIsActive((active) => true);
  };

  const handleChange = (e) => {
    if (isPreview) {
      return false;
    }
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

      updateObject({
        px: position.x,
        py: position.y,
        pz: position.z,
        sx: scale.x,
        sy: scale.y,
        sz: scale.z,
        rx: rotation.x,
        ry: rotation.y,
        rz: rotation.z,
      });

      objectStore.updateObject([...temp]);
    } catch (error) {}
  };

  useEffect(() => {
    const tempMode: any = editMode[cursorStore.type];
    setMode(tempMode);
  }, [cursorStore.type]);

  if (props.userData.type == "BOX") {
    return (
      <>
        {!props.userData.isRemoved && (
          <TransformControls
            showX={showAxis}
            showY={showAxis}
            showZ={showAxis}
            ref={controlsRef}
            object={meshRef}
            mode={mode}
            enabled={targetId == props.userData.id}
            onMouseUp={handleChange}
          >
            {props.userData.enablePhysics ? (
              <RigidBody>
                <mesh
                  onClick={handleClick}
                  {...props}
                  ref={meshRef}
                  castShadow={props.userData.shadow.cast}
                  receiveShadow={props.userData.shadow.receive}
                >
                  <boxGeometry />
                  <meshStandardMaterial color={"#ffffff"} />
                </mesh>
              </RigidBody>
            ) : (
              <mesh
                onClick={handleClick}
                {...props}
                ref={meshRef}
                castShadow={props.userData.shadow.cast}
                receiveShadow={props.userData.shadow.receive}
              >
                <boxGeometry />
                <meshStandardMaterial color={"#ffffff"} />
              </mesh>
            )}
          </TransformControls>
        )}
      </>
    );
  }

  return (
    <>
      {!props.userData.isRemoved && (
        <TransformControls
          showX={showAxis}
          showY={showAxis}
          showZ={showAxis}
          ref={controlsRef}
          object={meshRef}
          mode={mode}
          enabled={targetId == props.userData.id}
          onMouseUp={handleChange}
        >
          {props.userData.enablePhysics ? (
            <RigidBody>
              <mesh
                onClick={handleClick}
                {...props}
                ref={meshRef}
                castShadow={props.userData.shadow.cast}
                receiveShadow={props.userData.shadow.receive}
              >
                <primitive object={gltf.scene} />
                <meshStandardMaterial color={isActive ? "black" : "orange"} />
              </mesh>
            </RigidBody>
          ) : (
            <mesh
              onClick={handleClick}
              {...props}
              ref={meshRef}
              castShadow={props.userData.shadow.cast}
              receiveShadow={props.userData.shadow.receive}
            >
              <primitive object={gltf.scene} />
              <meshStandardMaterial color={isActive ? "black" : "orange"} />
            </mesh>
          )}
        </TransformControls>
      )}

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
