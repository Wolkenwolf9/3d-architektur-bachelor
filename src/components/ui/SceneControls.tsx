'use client';

import { Settings, X } from 'lucide-react';
import Toggle from './Toggle';

export default function SceneControls({
  open,
  onToggleOpen,
  showArrows,
  setShowArrows,
  showVirtualStudio,
  setShowVirtualStudio,
  showAufzüge,
  setShowAufzüge,
  showMensa,
  setShowMensa,
  showBib,
  setShowBib,
  showCameraDebug,
  setShowCameraDebug,
}: {
  open: boolean;
  onToggleOpen: () => void;
  showArrows: boolean;
  setShowArrows: (value: boolean) => void;
  showVirtualStudio: boolean;
  setShowVirtualStudio: (value: boolean) => void;
  showAufzüge: boolean;
  setShowAufzüge: (value: boolean) => void;
  showMensa: boolean;
  setShowMensa: (value: boolean) => void;
  showBib: boolean;
  setShowBib: (value: boolean) => void;
  showCameraDebug: boolean;
  setShowCameraDebug: (value: boolean) => void;
}) {
  return (
    <div className='absolute top-4 left-4 z-50'>
      <button
        onClick={onToggleOpen}
        className='mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20'
      >
        {open ? <X size={20} /> : <Settings size={20} />}
      </button>

      {open && (
        <div className='flex flex-col gap-3 rounded-xl border border-zinc-700 bg-white/10 p-4 backdrop-blur-md'>
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
      )}
    </div>
  );
}
