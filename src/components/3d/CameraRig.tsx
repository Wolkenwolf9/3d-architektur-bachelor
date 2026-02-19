"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface CameraRigProps {
  mode: string;
}

export default function CameraRig({ mode }: CameraRigProps) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const lookAtTarget = new THREE.Vector3(0, 0, 0);

  useFrame(() => {
    // Definiere Zielposition abhängig vom Modus
    switch (mode) {
      case "overview":
        targetPosition.current.set(-5, 2, -1.5); // leicht oben rechts
        break;
      case "side":
        targetPosition.current.set(5, 2, 0); // Seitenprofil
        break;
      case "top":
        targetPosition.current.set(0, 6, 0.1); // Vogelperspektive
        break;
      case "front":
        targetPosition.current.set(0, 2, 5); // Frontalansicht
        break;
      case "orbit":
      default:
        // In Orbit-Modus bewegt sich Kamera frei (kein Update hier)
        break;
    }

    if (mode !== "orbit") {
      // Sanfte Interpolation der Kamera
      camera.position.lerp(targetPosition.current, 0.05);
      camera.lookAt(lookAtTarget);
    }
  });

  return null;
}
