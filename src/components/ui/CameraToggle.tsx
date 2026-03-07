'use client';

import { motion } from 'framer-motion';
import { Camera, Eye, Box, SwitchCamera, Bird } from 'lucide-react';
import { JSX } from 'react';

export type CameraMode =
  | 'orbit'
  | 'front'
  | 'side'
  | 'top'
  | 'overview'
  | 'studio360';

interface CameraToggleProps {
  onChange: (mode: CameraMode) => void;
  /** wenn null: kein Button aktiv (z.B. im 360 Modus) */
  activeMode?: CameraMode | null;
}

const modes: Array<{ id: CameraMode; label: string; icon: JSX.Element }> = [
  { id: 'orbit', label: 'Frei', icon: <Box size={18} /> },
  { id: 'front', label: 'Front', icon: <SwitchCamera size={18} /> },
  { id: 'side', label: 'Seite', icon: <Eye size={18} /> },
  { id: 'top', label: 'Vogel', icon: <Bird size={18} /> },
  { id: 'overview', label: 'Aufsicht', icon: <Camera size={18} /> },
];

export default function CameraToggle({
  onChange,
  activeMode = 'front',
}: CameraToggleProps) {
  const handleToggle = (id: CameraMode) => {
    onChange(id);
  };

  return (
    <div className='fixed bottom-4 left-1/2 -translate-x-1/2 z-55 flex max-w-[95vw] overflow-x-auto bg-zinc-800/70 backdrop-blur-md rounded-full shadow-lg border border-zinc-700 p-1'>
      {modes.map((m) => {
        const isActive = activeMode === m.id; // bei null -> nie true

        return (
          <motion.button
            key={m.id}
            onClick={() => handleToggle(m.id)}
            className={`relative flex flex-col items-center justify-center px-3 py-2 sm:px-4 rounded-full text-sm transition-all ${
              isActive ? 'text-white' : 'text-zinc-400'
            }`}
          >
            {isActive && (
              <motion.div
                className='absolute inset-0 rounded-full bg-zinc-700'
                layoutId='activeBg'
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                animate={{ opacity: isActive ? 1 : 0 }}
              />
            )}

            <div className='relative flex items-center gap-2 z-10'>
              {m.icon}
              <span className='hidden sm:inline'>{m.label}</span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
