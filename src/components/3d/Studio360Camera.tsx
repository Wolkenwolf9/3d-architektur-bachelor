'use client';

import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function Studio360Camera({
  center,
  controlsRef,
}: {
  center: [number, number, number];
  controlsRef: React.RefObject<any>;
}) {
  const { camera } = useThree();

  useEffect(() => {
    const c = new THREE.Vector3(...center);
    camera.updateProjectionMatrix();

    // nicht exakt ins Zentrum, sondern minimal davor damit man um zentrum rotiert
    const bufferDistance = 0.001;
    camera.position.set(c.x, c.y, c.z - bufferDistance);

    if (controlsRef.current) {
      controlsRef.current.target.copy(c);

      // nur rotieren, kein pan/zoom
      controlsRef.current.enablePan = false;
      controlsRef.current.enableZoom = false;

      controlsRef.current.update();
    }
  }, [camera, center, controlsRef]);

  return null;
}
