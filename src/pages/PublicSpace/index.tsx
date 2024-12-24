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
  const [spaceOption, setSpaceOption] = useState({
    backgroundColor: "ffffff",
  });
  const [responseList, setResponseList] = useState([]);

  const useObjectHooks = useObject();

  const getFiles = async () => {
    try {
      const getSpace = await instance.get(
        `space/${location.pathname.split("/")[2]}`
      );

      const files = getSpace.data.space.files;

      setSpaceOption({
        backgroundColor: getSpace.data.space.backgroundColor,
      });

      console.log(getSpace.data.space.backgroundColor);
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
          <color
            attach="background"
            args={[`#${spaceOption.backgroundColor}`]}
          />

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
