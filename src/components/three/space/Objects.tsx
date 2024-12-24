import {
  ObjectMap,
  ThreeElements,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { ObjectMaterialsType, useObjectsStore } from "../../../states/objects";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OptionPanelContext } from "../../../context/OptionPanelContext";
import { GLTF, GLTFLoader, FBXLoader } from "three-stdlib";
import { OrbitControls, useFBX, useGLTF } from "@react-three/drei";

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

type ObjectSpaceType = "edit" | "preview" | "public";

export function Objects({
  objectList,
  responseList,
  onZoom,
  isZoom,
  type = "edit",
}: {
  objectList?: any;
  responseList?: any;
  onZoom?: any;
  isZoom?: boolean;
  type: ObjectSpaceType;
}) {
  const [targetPosition, setTargetPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );

  const { camera } = useThree();

  const handleClick = (fileId: string) => {
    if (type != "public") {
      return false;
    }

    const indexList = responseList.findIndex((item) => {
      return item.id == fileId;
    });

    if (responseList[indexList].trigger.length == 0) return false;

    const triggerMap = responseList[indexList].trigger.filter((trigg) => {
      return trigg.when == "CLICK";
    });

    for (let index = 0; index < triggerMap.length; index++) {
      const events = triggerMap[index].event;
      if (triggerMap[index].event.length == 0) continue;

      for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
        const event = events[eventIndex];
        switch (event.key) {
          case "MOVE_URL":
            location.href = event.value;
            break;

          case "FOCUS_ON":
            onZoom();
            setTargetPosition(
              new THREE.Vector3(
                responseList[indexList].px,
                responseList[indexList].py,
                responseList[indexList].pz
              )
            );
            break;

          default:
            break;
        }

        console.log(event.key, event.value);
      }
    }
  };

  useEffect(() => {
    camera.zoom = isZoom ? 4 : 1;
    camera.updateProjectionMatrix();
  }, [camera, isZoom]);

  useThree(({ camera }) => {
    camera.rotation.set(
      THREE.MathUtils.degToRad(-20),
      THREE.MathUtils.degToRad(20),
      THREE.MathUtils.degToRad(3)
    );
  });

  return (
    <>
      <OrbitControls makeDefault target={targetPosition} zoom0={0.0001} />

      {objectList.map((objectItem) => (
        <Suspense fallback={<mesh></mesh>}>
          <ObjectModel
            props={{
              userData: {
                id: objectItem.id,
                url: `${objectItem.url}`,
                isRemoved: objectItem.isRemoved,
                enablePhysics: objectItem.enablePhysics,
                type: objectItem.type,
                sceneType: type,
                shadow: {
                  cast: objectItem.shadow.cast,
                  receive: objectItem.shadow.receive,
                },
                materials: objectItem.materials,
              },

              position: new THREE.Vector3(
                objectItem.position.x,
                objectItem.position.y,
                objectItem.position.z
              ),
              scale: new THREE.Vector3(
                objectItem.scale.x,
                objectItem.scale.y,
                objectItem.scale.z
              ),
              rotation: new THREE.Euler(
                objectItem.rotation.x,
                objectItem.rotation.y,
                objectItem.rotation.z
              ),
            }}
            actions={{
              onClickNext: () => handleClick(objectItem.id),
            }}
          ></ObjectModel>
        </Suspense>
      ))}
    </>
  );
}

type ObjectActions = {
  onClickNext?: any;
};

function ObjectModel({
  props,
  actions,
}: {
  props: ThreeElements["mesh"];
  actions?: ObjectActions;
}) {
  const { isPreview } = usePageStore();

  const meshRef = useRef<THREE.Mesh>(null!);
  const [isActive, setIsActive] = useState(false);
  const [url, setUrl] = useState(props.userData.url);

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

  const showAxis =
    props.userData.sceneType == "edit"
      ? isPreview
        ? false
        : targetId == props.userData.id
        ? true
        : false
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
    if (props.userData.sceneType == "public") {
      actions.onClickNext();
    }
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
                {props.userData.type == "MODEL" && <PrimitiveModel url={url} />}

                {props.userData.type == "MESH" && (
                  <ExtractGeometry
                    url={url}
                    materials={props.userData.materials}
                  />
                )}
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
              {props.userData.type == "MODEL" && <PrimitiveModel url={url} />}

              {props.userData.type == "MESH" && (
                <ExtractGeometry
                  url={url}
                  materials={props.userData.materials}
                />
              )}
            </mesh>
          )}
        </TransformControls>
      )}
    </>
  );
}

function PrimitiveModel({ url }: { url?: string }) {
  const filename = url.split("?")[0];

  if (filename.split(".")[filename.split(".").length - 1] == "glb") {
    const [gltf, setGltf] = useState<any>(useLoader(GLTFLoader, url));

    return <primitive object={gltf.scene} />;
  }

  if (filename.split(".")[filename.split(".").length - 1] == "fbx") {
    const [fbx, setFbx] = useState<any>(useLoader(FBXLoader, url));

    return <primitive object={fbx} />;
  }

  return <></>;
}

function PrimitiveMeshModel({ url }: { url?: string }) {
  const filename = url.split("?")[0];
}

//NOTE: glb 타입만 가능
function ExtractGeometry({
  url,
  materials = [],
}: {
  url?: string;
  materials?: ObjectMaterialsType[];
}) {
  const [model, setModel] = useState<any>(useGLTF(url));
  const [geometries, setGeometries] = useState<any>(
    Object.values(model.nodes)
      .filter((node: any) => node.isMesh)
      .map((mesh: any) => mesh.geometry)
  );

  useEffect(() => {
    const { nodes } = useGLTF(url);
    setGeometries(
      Object.values(nodes)
        .filter((node: any) => node.isMesh)
        .map((mesh: any) => mesh.geometry)
    );
  }, [url]);

  return (
    <group>
      {geometries.map((geometry, index) => (
        <>
          <mesh key={index} geometry={geometry}>
            {materials.map((material) => (
              <>
                {material.type == "STANDARD" && (
                  <meshStandardMaterial color={`${material.value}`} />
                )}
                {material.type == "DEPTH" && <meshDepthMaterial />}
                {material.type == "NORMAL" && <meshNormalMaterial />}
              </>
            ))}
          </mesh>
        </>
      ))}
    </group>
  );
}
