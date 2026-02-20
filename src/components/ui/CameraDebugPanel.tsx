'use client';

import { useState } from 'react';

export default function CameraDebugPanel({
  enabled,
  text,
}: {
  enabled: boolean;
  text: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  if (!enabled) return null;

  return (
    <div className='fixed top-16 right-4 z-50'>
      <div
        className='w-[280px] bg-black/70 backdrop-blur-md border border-white/15
                   rounded-2xl px-4 py-3 text-white text-xs font-mono leading-relaxed'
      >
        <pre className='whitespace-pre-wrap'>{text}</pre>

        <button
          onClick={handleCopy}
          className={`mt-2 w-full px-3 py-1 rounded-lg text-[11px] border transition-all duration-200
            ${
              copied
                ? 'bg-emerald-500 border-emerald-400'
                : 'bg-white/10 border-white/20 hover:bg-white/20'
            }`}
        >
          {copied ? 'Copied!' : 'Copy values'}
        </button>
      </div>
    </div>
  );
}
