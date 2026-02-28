'use client';

import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export default function BibliothekModel({
  onEnter360,
}: {
  onEnter360?: () => void;
}) {
  const meshRef1 = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    const meshes = [meshRef1.current, meshRef2.current];

    meshes.forEach((mesh) => {
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      const targetOpacity = hovered ? 0.8 : 0.3;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.1);
    });
  });

  return (
    <group scale={0.04}>
      {/* Bibliothek 1 */}
      <mesh
        ref={meshRef1}
        position={[-27.96, 1.7608, -12.059]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onEnter360?.();
        }}
      >
        <boxGeometry args={[30.7, 2.66, 10.8]} />
        <meshStandardMaterial
          color='#4bf542'
          transparent
          opacity={0.3}
          depthTest={false}
        />
      </mesh>

      {/* Bibliothek 2 */}
      <mesh
        ref={meshRef2}
        position={[-36.852, 1.7608, 9.5168]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onEnter360?.();
        }}
      >
        <boxGeometry args={[20.1, 2.66, 29]} />
        <meshStandardMaterial
          color='#4bf542'
          transparent
          opacity={0.3}
          depthTest={false}
        />
      </mesh>

      {hovered && (
        <Html position={[-32, 8, -2]}>
          <div className='bg-white/10 text-white backdrop-blur-md border border-zinc-700 rounded-full px-4 py-2 transition whitespace-nowrap'>
            Bibliothek
          </div>
        </Html>
      )}
    </group>
  );
}
