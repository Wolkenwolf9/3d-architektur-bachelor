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
  textureUrl = '/Bauwesen-Zwischengeschoß.jpeg',
  radius = 0.6,
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
useTexture.preload('/Bauwesen-Zwischengeschoß.jpeg');
useTexture.preload('/Bauwesen-vor-Bibliothek.jpeg');
useTexture.preload('/Bauwesen-Sitzbereich-1.jpeg');
useTexture.preload('/Bauwesen-Lernbereich-1.jpeg');
