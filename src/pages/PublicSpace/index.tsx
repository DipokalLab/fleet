import { OrbitControls } from "@react-three/drei";
import instance from "@/api/axios";
import { EntryScene } from "@/components/three/Scene";
import { Canvas, ThreeElements, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { ObjectMap, useFrame, useLoader } from "@react-three/fiber";
import { useObjectsStore } from "@/states/objects";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { OptionPanelContext } from "@/context/OptionPanelContext";
import { GLTF, GLTFLoader } from "three-stdlib";
import { useObject } from "@/hooks/useObject";
import { useCursorStore } from "@/states/cursor";
import {
  Html,
  Preload,
  TransformControls,
  useProgress,
} from "@react-three/drei";
import { isLocal } from "@/utils/isLocal";
import { hosts } from "@/api/hosts";
import { useNavigate } from "react-router";
import { css } from "@emotion/react";
import { Button } from "deventds2";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { Objects } from "@/components/three/space/Objects";

export function PublicSpacePage() {
  const [isZoom, setIsZoom] = useState(false);

  const { list } = useObjectsStore();
  const [responseList, setResponseList] = useState([]);

  const useObjectHooks = useObject();

  const getFiles = async () => {
    try {
      const getSpace = await instance.get(
        `space/${location.pathname.split("/")[2]}`
      );

      const files = getSpace.data.space.files;

      useObjectHooks.clear();

      for (let index = 0; index < files.length; index++) {
        const element = files[index];

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
                materials: [],
              }
            );
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
                materials: [],
              }
            );
            break;
          default:
            break;
        }
      }

      setResponseList([...getSpace.data.space.files]);
    } catch (error) {}
  };

  useEffect(() => {
    getFiles();
  }, []);

  const getPublicSpace = async () => {
    try {
      const spaceId = location.pathname.split("/")[2];
      const getSpace = await instance.get(`space/public/${spaceId}`);
      const files = getSpace.data.space.files;
    } catch (error) {}
  };

  const handleStopZoom = () => {
    setIsZoom(false);
  };

  const handleStartZoom = () => {
    setIsZoom(true);
  };

  return (
    <>
      {isZoom && (
        <div
          css={css({
            position: "fixed",
            top: "0.5rem",
            right: "0.5rem",
            zIndex: 999,
          })}
        >
          <Button size="sm" color="light" onClick={handleStopZoom}>
            Stop Zoom
          </Button>
        </div>
      )}
      <Canvas shadows>
        <Suspense>
          <directionalLight
            castShadow
            position={[0, 10, 0]}
            intensity={4}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-100}
            shadow-camera-right={100}
            shadow-camera-top={100}
            shadow-camera-bottom={-100}
          />

          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />

          <Physics gravity={[0, -9.8, 0]}>
            <mesh castShadow>
              <Objects
                objectList={list}
                responseList={responseList}
                type="public"
                onZoom={handleStartZoom}
                isZoom={isZoom}
              />
            </mesh>

            <CuboidCollider position={[0, -2, 0]} args={[100, 0.5, 100]} />
          </Physics>

          <Preload all />
        </Suspense>
      </Canvas>
    </>
  );
}

function Wall(props: ThreeElements["mesh"]) {
  return (
    <mesh visible {...props} castShadow={true} receiveShadow={true}>
      <meshStandardMaterial color={"#ffffff"} />
    </mesh>
  );
}

function ObjectsTemp({ onZoom, isZoom }: any) {
  const navigate = useNavigate();
  const [tempTargetPosition, setTempTargetPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );
  const [targetPosition, setTargetPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );

  const [list, setList] = useState([]);
  const [responseList, setResponseList] = useState([]);
  const { camera } = useThree();

  const getFiles = async () => {
    try {
      const getSpace = await instance.get(
        `space/public/${location.pathname.split("/")[2]}`
      );

      const files = getSpace.data.space.files.map((element) => {
        switch (element.type) {
          case "MODEL":
            return {
              url: `${isLocal() ? hosts.dev : hosts.prod}/${
                element.file.fileUrl
              }?id=${Math.random()}`,
              id: element.id,
              enablePhysics: element.enablePhysics,
              shadowCast: element.shadowCast,
              shadowReceive: element.shadowReceive,
              type: element.type,
              position: {
                x: element.px,
                y: element.py,
                z: element.pz,
              },
              scale: {
                x: element.sx,
                y: element.sy,
                z: element.sz,
              },
              rotation: {
                x: element.rx,
                y: element.ry,
                z: element.rz,
              },
            };
            break;

          case "BOX":
            return {
              url: ``,
              id: element.id,
              enablePhysics: element.enablePhysics,
              shadowCast: element.shadowCast,
              shadowReceive: element.shadowReceive,
              type: element.type,
              position: {
                x: element.px,
                y: element.py,
                z: element.pz,
              },
              scale: {
                x: element.sx,
                y: element.sy,
                z: element.sz,
              },
              rotation: {
                x: element.rx,
                y: element.ry,
                z: element.rz,
              },
            };
            break;

          case "MESH":
            return {
              url: `${isLocal() ? hosts.dev : hosts.prod}/${
                element.file.fileUrl
              }?id=${Math.random()}`,
              id: element.id,
              enablePhysics: element.enablePhysics,
              shadowCast: element.shadowCast,
              shadowReceive: element.shadowReceive,
              type: element.type,
              position: {
                x: element.px,
                y: element.py,
                z: element.pz,
              },
              scale: {
                x: element.sx,
                y: element.sy,
                z: element.sz,
              },
              rotation: {
                x: element.rx,
                y: element.ry,
                z: element.rz,
              },
            };
            break;
          default:
            break;
        }
      });

      setList([...files]);
      setResponseList([...getSpace.data.space.files]);
    } catch (error) {
      console.log(error);
      //navigate("/404");
    }
  };

  const handleClick = (fileId: string) => {
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

  useEffect(() => {
    getFiles();
  }, []);

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
      <mesh>
        {list.map((objectItem) => (
          <Object
            userData={{
              id: objectItem.id,
              url: `${objectItem.url}`,
              isRemoved: objectItem.isRemoved,
              enablePhysics: objectItem.enablePhysics,
              type: objectItem.type,
              shadow: {
                cast: objectItem.shadowCast,
                receive: objectItem.shadowReceive,
              },
            }}
            onClick={() => handleClick(objectItem.id)}
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
    </>
  );
}

function Object(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [isActive, setIsActive] = useState(false);
  const url: string = props.userData.url;

  const [gltf, setGltf] = useState<any>(
    ["MODEL", "MESH"].includes(props.userData.type)
      ? useLoader(GLTFLoader, url)
      : ""
  );

  if (props.userData.type == "BOX") {
    return (
      <>
        {props.userData.enablePhysics ? (
          <RigidBody>
            <mesh
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
            {...props}
            ref={meshRef}
            castShadow={props.userData.shadow.cast}
            receiveShadow={props.userData.shadow.receive}
          >
            <boxGeometry />
            <meshStandardMaterial color={"#ffffff"} />
          </mesh>
        )}
      </>
    );
  }

  return (
    <>
      {props.userData.enablePhysics ? (
        <RigidBody>
          <mesh
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
          {...props}
          ref={meshRef}
          castShadow={props.userData.shadow.cast}
          receiveShadow={props.userData.shadow.receive}
        >
          <primitive object={gltf.scene} />
          <meshStandardMaterial color={isActive ? "black" : "orange"} />
        </mesh>
      )}
    </>
  );
}
