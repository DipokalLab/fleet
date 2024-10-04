import { css } from "@emotion/react";
import { SUBTITLE_COLOR } from "../../theme/color";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

export function ModelBox({
  url,
  onClick,
  tag,
}: {
  url?: string;
  onClick?: any;
  tag?: string;
}) {
  return (
    <div
      onClick={onClick}
      css={css({
        width: "5rem",
        height: "5rem",
        backgroundColor: "#ffffff",
        borderRadius: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.75rem",
        color: SUBTITLE_COLOR,
        fontWeight: "600",
        cursor: "pointer",
        border: "0.1rem solid #ffffff",
        transition: "0.2s",
        ":hover": {
          border: "0.1rem solid #3b82f6",
        },
      })}
    >
      <LoadGlb url={url} />
    </div>
  );
}

function LoadGlb({ url }: any) {
  try {
    const meshRef = useRef<THREE.Mesh>(null!);
    const gltf: any = useLoader(GLTFLoader, url);

    return (
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

          <mesh ref={meshRef}>
            <primitive object={gltf.scene} />
            <meshStandardMaterial />
          </mesh>
        </Suspense>
      </Canvas>
    );
  } catch (error) {
    return <mesh></mesh>;
  }
}
