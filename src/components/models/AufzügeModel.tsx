"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

function Aufzug({
  position,
  label,
}: {
  position: [number, number, number];
  label: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    const targetOpacity = hovered ? 0.8 : 0.3;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.1);
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <boxGeometry args={[1.84883, 21.7211, 2.2797]} />
      <meshStandardMaterial
        color='#f5f5f5'
        transparent
        opacity={0.3}
        depthTest={false}
      />
      {hovered && (
        <Html position={[0, 15, 0]}>
          <div className='bg-white/10 text-white backdrop-blur-md border border-zinc-700 rounded-full px-4 py-2 whitespace-nowrap'>
            {label}
          </div>
        </Html>
      )}
    </mesh>
  );
}

export default function AufzügeModel() {
  return (
    <group scale={0.04}>
      <Aufzug position={[40.124, 10, -22.324]} label='Aufzug 1' />
      <Aufzug position={[-3.0851, 10, -22.324]} label='Aufzug 2' />
      <Aufzug position={[-46.273, 10, -22.324]} label='Aufzug 3' />
    </group>
  );
}
