"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

type ModelProps = {
  spread?: boolean;
};

export default function Model({ spread = false }: ModelProps) {
  const { scene } = useGLTF("/Haus-Bauwesen-standard_komprimiert.glb");
  const groupRef = useRef<THREE.Group>(null);

  // Alle Meshes extrahieren und klonen (damit sie unabhängig sind)
  const meshes = useMemo(() => {
    const result: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const clone = (child as THREE.Mesh).clone();
        clone.position.copy(child.position);
        clone.rotation.copy(child.rotation);
        clone.scale.copy(child.scale);
        result.push(clone);
      }
    });
    return result;
  }, [scene]);

  // Ausgangspositionen speichern
  const basePositions = useMemo(
    () => meshes.map((m) => m.position.clone()),
    [meshes],
  );

  // Zielpositionen vorbereiten (Y-Achsen-Stapelung)
  const targets = useRef<THREE.Vector3[]>([]);
  useEffect(() => {
    const offsetDistance = 5; // Abstand zwischen den Schichten
    targets.current = meshes.map((mesh, i) => {
      const base = basePositions[i].clone();
      const offsetY = spread ? i * offsetDistance : 0;
      return new THREE.Vector3(base.x, base.y + offsetY, base.z);
    });
  }, [spread, meshes, basePositions]);

  // Bewegung pro Frame
  useFrame(() => {
    meshes.forEach((mesh, i) => {
      const target = targets.current[i];
      if (!target) return;
      mesh.position.lerp(target, 0.05);
    });
  });

  return (
    <group ref={groupRef} scale={0.04}>
      {meshes.map((mesh, i) => (
        <primitive key={i} object={mesh} />
      ))}
    </group>
  );
}
