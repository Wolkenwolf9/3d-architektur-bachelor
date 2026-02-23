'use client';

import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { useEffect } from 'react';

type Props = {
  textureUrl?: string;
  radius?: number;
  position?: [number, number, number];
};

export default function VirtualStudio360({
  textureUrl = '/shot-panoramic-composition-library.jpg',
  radius = 0.04,
  position = [-2.48, 0.24, -0.36],
}: Props) {
  const texture = useTexture(textureUrl);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

useTexture.preload('/shot-panoramic-composition-library.jpg');
