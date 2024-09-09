import { Box, Preload } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Objects } from "./space/Objects";
import { Suspense } from "react";
import { Space } from "./space/Space";

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
  return (
    <Canvas shadows>
      <Suspense fallback={<CubeLoader />}>
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

        {children}

        <Objects></Objects>

        <Preload all />
      </Suspense>
    </Canvas>
  );
}
