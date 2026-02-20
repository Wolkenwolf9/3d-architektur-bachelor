'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function CameraTracker({
  enabled,
  onUpdate,
}: {
  enabled: boolean;
  onUpdate: (text: string) => void;
}) {
  const { camera } = useThree();
  const last = useRef<string>('');

  useFrame(() => {
    if (!enabled) return;

    const p = camera.position;
    const r = camera.rotation;

    const fov = camera instanceof THREE.PerspectiveCamera ? camera.fov : null;

    const next =
      `pos: [${p.x.toFixed(3)}, ${p.y.toFixed(3)}, ${p.z.toFixed(3)}]\n` +
      `rot: [${r.x.toFixed(3)}, ${r.y.toFixed(3)}, ${r.z.toFixed(3)}]\n` +
      `fov: ${fov !== null ? fov.toFixed(0) : '-'}`;

    if (next !== last.current) {
      last.current = next;
      onUpdate(next);
    }
  });

  return null;
}
