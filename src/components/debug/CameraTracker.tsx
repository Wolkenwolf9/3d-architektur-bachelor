'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

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

    const next =
      `pos: [${p.x.toFixed(3)}, ${p.y.toFixed(3)}, ${p.z.toFixed(3)}]\n` +
      `rot: [${r.x.toFixed(3)}, ${r.y.toFixed(3)}, ${r.z.toFixed(3)}]\n` +
      `fov: ${(camera as any).fov?.toFixed?.(0) ?? '-'}`;

    // nur updaten wenn sich was ändert (damit UI nicht unnötig rendert)
    if (next !== last.current) {
      last.current = next;
      onUpdate(next);
    }
  });

  return null;
}
