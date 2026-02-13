import { Html, useProgress } from '@react-three/drei';

export default function Preloader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className='flex flex-col items-center gap-4 text-white'>
        <div className='w-40 h-1 bg-white/20 rounded-full overflow-hidden'>
          <div
            className='h-full bg-white transition-all duration-300'
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className='text-sm tracking-wide'>
          Lade Modelle… {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}
