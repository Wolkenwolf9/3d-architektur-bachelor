'use client';

interface Toggle {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

// Toggle Komponente zum mit einfachem SLider
export default function Toggle({ label, checked, onChange }: Toggle) {
  return (
    <label className='flex items-center justify-between gap-4 cursor-pointer text-white select-none'>
      <span className='text-sm'>{label}</span>

      <button
        type='button'
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors
          ${checked ? 'bg-green-500' : 'bg-zinc-600'}`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform
            ${checked ? 'translate-x-6' : ''}`}
        />
      </button>
    </label>
  );
}
