import { Box, Preload, Torus } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Objects } from "./space/Objects";
import { Suspense } from "react";
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

        <Physics gravity={[0, -9.8, 0]} debug>
          {children}

          <Objects></Objects>
          <CuboidCollider position={[0, -2, 0]} args={[100, 0.5, 100]} />

          <Preload all />
        </Physics>
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
