"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import Model from "./Model";
import CameraRig from "./CameraRig";
import { Suspense, useEffect, useState } from "react";
import CameraToggle from "./CameraToggle";
import PfeileModel from "./PfeileModel";
import VirtualStudioModel from "./VirtualStudioModel";
import Preloader from "./Preloader";
import AufzügeModel from "./AufzügeModel";
import Toggle from "./Toggle";
import MensaModel from "./MensaModel";

// function CameraRig() {
//   const scroll = useScroll();
//   const { camera } = useThree();

//   useFrame(() => {
//     const t = scroll.offset * Math.PI * 2;
//     const radius = 5;
//     const x = Math.sin(t) * radius;
//     const z = Math.cos(t) * radius;
//     camera.position.set(x, 2, z);
//     camera.lookAt(0, 0, 0);
//   });

//   return null;
// }

export default function Scene() {
  const [cameraMode, setCameraMode] = useState("front");
  const [spread, setSpread] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [showVirtualStudio, setShowVirtualStudio] = useState(false);
  const [showAufzüge, setShowAufzüge] = useState(false);
  const [showMensa, setShowMensa] = useState(false);
  useEffect(() => {
    useGLTF.preload("/Haus-Bauwesen-standard_komprimiert.glb");
    useGLTF.preload("/Eingangspfeile.glb");
  }, []);
  return (
    <div className='relative w-full h-screen'>
      <Canvas style={{ background: "#0a0a0a" }}>
        <Suspense fallback={<Preloader />}>
          {/* <ScrollControls pages={3}> */}
          <CameraRig mode={cameraMode} />
          {cameraMode === "orbit" && <OrbitControls enableDamping />}
          {/* <CameraRig /> */}
          {/* <OrbitControls /> */}
          <Environment preset='city' background={false} />
          {/* <directionalLight></directionalLight> */}
          <ambientLight intensity={0.5} />
          <Model spread={spread} />
          {showArrows && <PfeileModel />}
          {showVirtualStudio && <VirtualStudioModel />}
          {showAufzüge && <AufzügeModel />}
          {showMensa && <MensaModel />}
          {/* </ScrollControls> */}
        </Suspense>
      </Canvas>
      <CameraToggle onChange={setCameraMode} />
      {/* //Button zum auffächern des Modells */}
      <button
        onClick={() => setSpread(!spread)}
        className='absolute top-4 right-4 bg-white/10 text-white backdrop-blur-md border border-zinc-700 rounded-full px-4 py-2 hover:bg-white/20 transition'
      >
        {spread ? "Zusammenfügen" : "Verteilen"}
      </button>
      {/* //Button um Eingänge ein/aus zu togglen */}
      <div className='absolute top-4 left-4 flex flex-col gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-md border border-zinc-700'>
        <Toggle
          label='Eingänge anzeigen'
          checked={showArrows}
          onChange={setShowArrows}
        />

        <Toggle
          label='Virtuelles Studio'
          checked={showVirtualStudio}
          onChange={setShowVirtualStudio}
        />

        <Toggle
          label='Aufzüge anzeigen'
          checked={showAufzüge}
          onChange={setShowAufzüge}
        />

        <Toggle
          label='Mensa anzeigen'
          checked={showMensa}
          onChange={setShowMensa}
        />
      </div>
    </div>
  );
}
