"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export default function MensaModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;

    const targetOpacity = hovered ? 0.8 : 0.3;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.1);
  });

  return (
    <group scale={0.04}>
      <mesh
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        ref={meshRef}
        position={[-66.141, 3.7119, 42.599]}
      >
        <boxGeometry args={[35.2, 6.62, 26.6]} />
        <meshStandardMaterial
          color='#4bf542'
          transparent
          opacity={0.3}
          depthTest={false}
        />
        {hovered && (
          <Html position={[0, 15, 0]}>
            <div className='text-2x top-4 right-4 bg-white/10 text-white backdrop-blur-md border border-zinc-700 rounded-full px-4 py-2 hover:bg-white/20 transition whitespace-nowrap'>
              Mensa
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}
