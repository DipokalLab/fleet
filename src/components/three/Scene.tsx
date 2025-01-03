import {
  Box,
  Environment,
  Grid,
  Preload,
  Torus,
  useFBO,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Objects } from "./space/Objects";
import { Suspense, useEffect, useState } from "react";
import { Space } from "./space/Space";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  LensFlare,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { usePageStore } from "@/states/page";
import { Pathtracer } from "@react-three/gpu-pathtracer";
import { isLocal } from "@/utils/isLocal";
import { hosts } from "@/api/hosts";
import { useObjectsStore } from "@/states/objects";
import { useObject } from "@/hooks/useObject";
import instance from "@/api/axios";
const CubeLoader = () => {
  return (
    <mesh>
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

      <Space />
    </mesh>
  );
};

export function EntryScene({ children }: { children?: React.ReactNode }) {
  const { isPhysicsDebug } = usePageStore();

  const { list } = useObjectsStore();
  const [responseList, setResponseList] = useState([]);
  const [whenScreenshot, setWhenScreenshot] = useState(false);

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
      setTimeout(() => {
        setWhenScreenshot(true);
      }, 3000);
    } catch (error) {}
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <Canvas id="mainCanvas" shadows>
      <Suspense fallback={<CubeLoader />}>
        <Screenshot whenScreenshot={whenScreenshot} />

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

        <Physics gravity={[0, -9.8, 0]} debug={isPhysicsDebug}>
          {children}

          <Objects objectList={list} responseList={responseList} type="edit" />
          <CuboidCollider position={[0, -2, 0]} args={[100, 0.5, 100]} />

          <Preload all />
        </Physics>

        <Grid
          position={[0, -1.5, 0]}
          args={[4000, 4000]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="white"
          sectionSize={20}
          sectionThickness={1.5}
          sectionColor="#f0f2f5"
          fadeDistance={1000}
          fadeStrength={1}
          followCamera={true}
        />
      </Suspense>

      {/* <EffectComposer>
        <Noise
          premultiply // enables or disables noise premultiplication
          blendFunction={BlendFunction.ADD} // blend mode
        />
      </EffectComposer> */}
    </Canvas>
  );
}

function Screenshot({ whenScreenshot }: { whenScreenshot?: boolean }) {
  const { gl, scene, camera } = useThree();

  const uploadScreenshot = async (blob) => {
    try {
      const formData = new FormData();

      formData.append("image", blob, "screenshot.png");
      const spaceId = location.pathname.split("/")[2];

      const requestUploadFile = await instance.put(
        `space/screenshot/${spaceId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {}
  };

  const render = () => {
    gl.render(scene, camera);

    gl.domElement.toBlob((blob) => {
      if (blob) {
        uploadScreenshot(blob);
      } else {
        console.error("Failed to capture screenshot as Blob.");
      }
    }, "image/png");
  };

  useEffect(() => {
    if (whenScreenshot) {
      render();
    }
  }, [whenScreenshot]);

  return <></>;
}
