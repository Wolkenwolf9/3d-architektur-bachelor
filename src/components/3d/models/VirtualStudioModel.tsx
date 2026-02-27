'use client';

import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import Image from 'next/image';

export default function VirtualStudioModel({
  onEnter360,
}: {
  onEnter360?: () => void;
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
    <group scale={0.04}>
      <mesh
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onEnter360?.();
        }}
        ref={meshRef}
        position={[-62, 6, -9]}
      >
        <boxGeometry args={[11.2103, 2.99, 6.68]} />
        <meshStandardMaterial
          color='orange'
          transparent
          opacity={0.3}
          depthTest={false}
        />
        {hovered && (
          <Html position={[20, 40, -20]}>
            <div className='w-[320px] rounded-2xl overflow-hidden border border-white/15 bg-black/70 backdrop-blur-xl shadow-2xl'>
              <div className='relative w-60 aspect-video overflow-hidden rounded-lg'>
                <Image
                  src='/Studio1.png'
                  alt='CampusTV Studio'
                  className='h-full w-full object-cover'
                  draggable={false}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent' />
              </div>

              <div className='p-4'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='text-base font-semibold text-white'>
                    Virtuelles Studio
                  </div>
                  <span className='text-[11px] px-2 py-1 rounded-full border border-white/15 bg-white/10 text-white/80'>
                    360°
                  </span>
                </div>

                <p className='mt-2 text-sm text-white/70'>
                  Ein Blick ins CampusTV / Lehrfilmstudio - interaktiv in einer
                  360°-Ansicht.
                </p>

                <div className='mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 border border-white/15'>
                  <span className='inline-block h-2 w-2 rounded-full bg-emerald-400' />
                  Für 360°-Tour klicken
                </div>
              </div>
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}
