"use client";

import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function PfeileModel() {
  const { scene } = useGLTF("/Eingangspfeile1.glb");
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scale = 0.04 + Math.sin(t * 5) * 0.0005;
    if (groupRef.current) {
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <primitive ref={groupRef} object={scene} scale={0.04} />
    //   <Edges linewidth={4} color="black" />
    // </primitive>
  );
}
