'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import Model from './models/BauwesenModel';
import CameraRig from './CameraRig';
import { Suspense, useEffect, useRef, useState } from 'react';
import CameraToggle, { CameraMode } from '../ui/CameraToggle';
import PfeileModel from './models/PfeileModel';
import VirtualStudioModel from './models/VirtualStudioModel';
import Preloader from './Preloader';
import AufzügeModel from './models/AufzügeModel';
import Toggle from '../ui/Toggle';
import MensaModel from './models/MensaModel';
import CameraTracker from '../debug/CameraTracker';
import CameraDebugPanel from '../ui/CameraDebugPanel';
import VirtualStudio360 from './models/VirtualStudio360';
import Studio360Camera from './Studio360Camera';
import VirtualStudioOverlay from '../ui/VirtualStudioOverlay';
import BibliothekModel from './models/BibliothekModel';

import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

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

// type CameraMode = 'overview' | 'side' | 'top' | 'front' | 'orbit' | 'studio360';

export default function Scene() {
  const [cameraMode, setCameraMode] = useState<CameraMode>('front');
  const [spread, setSpread] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [showVirtualStudio, setShowVirtualStudio] = useState(false);
  const [showAufzüge, setShowAufzüge] = useState(false);
  const [showMensa, setShowMensa] = useState(false);
  const [showBib, setShowBib] = useState(false);
  const [showCameraDebug, setShowCameraDebug] = useState(false);
  const [cameraDebugText, setCameraDebugText] = useState('');

  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const STUDIO_CENTER: [number, number, number] = [-2.48, 0.24, -0.36];
  const in360 = cameraMode === 'studio360';

  useEffect(() => {
    useGLTF.preload('/Haus-Bauwesen-standard_komprimiert.glb');
    useGLTF.preload('/Eingangspfeile.glb');
  }, []);

  const enterStudio360 = () => {
    setCameraMode('studio360');
  };

  const exitStudio360 = (next: CameraMode = 'orbit') => {
    setCameraMode(next);
  };

  return (
    <div className='relative w-full h-screen'>
      <Canvas
        style={{ background: '#0a0a0a' }}
        shadows
        camera={{ near: 0.1, fov: 75 }}
      >
        <Suspense fallback={<Preloader />}>
          {/* <ScrollControls pages={3}> */}
          <CameraRig mode={cameraMode} />
          <CameraTracker
            enabled={showCameraDebug}
            onUpdate={setCameraDebugText}
          />
          {cameraMode === 'orbit' && (
            <OrbitControls ref={controlsRef} makeDefault enableDamping />
          )}
          {/* <CameraRig /> */}
          {in360 && (
            <OrbitControls
              ref={controlsRef}
              makeDefault
              enableDamping
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.6}
            />
          )}
          {/* <OrbitControls /> */}
          {/* 360: Kamera zentrieren + Sphere anzeigen */}
          {in360 && (
            <>
              <Studio360Camera
                center={STUDIO_CENTER}
                controlsRef={controlsRef}
              />
              <VirtualStudio360 />
            </>
          )}
          <ambientLight intensity={1} />
          <Environment preset='city' background={false} />
          <directionalLight position={[1, 1, 1]} intensity={5} castShadow />
          {!in360 && (
            <>
              <Model spread={spread} />
              {showArrows && <PfeileModel />}
              {showVirtualStudio && (
                <VirtualStudioModel onEnter360={enterStudio360} />
              )}
              {showAufzüge && <AufzügeModel />}
              {showBib && <BibliothekModel />}
              {showMensa && <MensaModel />}
            </>
          )}
          {/* </ScrollControls> */}
        </Suspense>
      </Canvas>
      <CameraToggle
        activeMode={cameraMode === 'studio360' ? null : cameraMode}
        onChange={(m) => setCameraMode(m)}
      />

      <CameraDebugPanel enabled={showCameraDebug} text={cameraDebugText} />
      {/* //Button zum auffächern des Modells */}
      <VirtualStudioOverlay
        open={in360}
        onClose={() => exitStudio360('orbit')}
      />

      <button
        onClick={() => setSpread(!spread)}
        className='absolute top-4 right-4 bg-white/10 text-white backdrop-blur-md border border-zinc-700 rounded-full px-4 py-2 hover:bg-white/20 transition'
      >
        {spread ? 'Zusammenfügen' : 'Verteilen'}
      </button>
      {/* //Button um Komponenten ein/aus zu togglen */}
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

        <Toggle
          label='Bibliothek anzeigen'
          checked={showBib}
          onChange={setShowBib}
        />

        <Toggle
          label='Kamera Debug'
          checked={showCameraDebug}
          onChange={setShowCameraDebug}
        />
      </div>
    </div>
  );
}
