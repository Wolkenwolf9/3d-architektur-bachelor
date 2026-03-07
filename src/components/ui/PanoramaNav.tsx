'use client';

type Panorama = {
  id: string;
  src: string;
  label: string;
};

export default function PanoramaNav({
  panoramas,
  activePanorama,
  onSelect,
}: {
  panoramas: Panorama[];
  activePanorama: string;
  onSelect: (src: string) => void;
}) {
  return (
    <div className='absolute bottom-20 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,484px)]'>
      <div className='flex gap-2 overflow-x-auto rounded-full border border-zinc-700 bg-zinc-800/70 p-2 backdrop-blur-md shadow-lg'>
        {panoramas.map((p) => {
          const isActive = activePanorama === p.src;

          return (
            <button
              key={p.id}
              onClick={() => onSelect(p.src)}
              className={`shrink-0 rounded-full px-3 py-2 text-sm transition whitespace-nowrap ${
                isActive
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
