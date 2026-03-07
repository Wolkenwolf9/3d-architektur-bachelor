'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function VirtualStudioOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [collapsedMobile, setCollapsedMobile] = useState(false);

  // Wenn Overlay neu geöffnet wird, standardmäßig ausgeklappt starten
  useEffect(() => {
    if (open) setCollapsedMobile(false);
  }, [open]);

  // Desktop: open steuert das komplette Overlay
  // Mobile: open steuert "existiert", collapsedMobile steuert "eingeklappt"
  const mobileCollapsed = open && collapsedMobile;

  return (
    <>
      {/* Optionaler Backdrop auf Mobile, wenn ausgeklappt */}
      {open && !mobileCollapsed && (
        <button
          onClick={() => setCollapsedMobile(true)}
          className='sm:hidden fixed inset-0 z-20 bg-black/40'
        />
      )}

      <aside
        className={[
          'fixed top-0 right-0 h-full z-50',
          'transition-transform duration-300 ease-out',
          // Desktop: normal ein/aus über open
          open ? 'translate-x-0' : 'translate-x-full',
          // Mobile: wenn eingeklappt, nur ein kleiner Streifen bleibt sichtbar
          open && collapsedMobile ? 'translate-x-full' : '',
        ].join(' ')}
      >
        {/* Mobile Handle (immer sichtbar, auch wenn eingeklappt) */}
        {open && (
          <button
            type='button'
            onClick={() => setCollapsedMobile((v) => !v)}
            className='
              sm:hidden
              absolute top-1/2 -translate-y-1/2 -left-10
              w-10 h-16
              rounded-l-2xl
              bg-black/70 backdrop-blur-xl
              border border-white/10 border-r-0
              flex items-center justify-center
              text-white/80 hover:text-white transition
            '
          >
            {collapsedMobile ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        )}

        <div
          className='
            h-full
            w-[85vw] sm:w-[33vw]
            min-w-[320px] sm:min-w-[320px]
            max-w-[520px]
            bg-black/70 backdrop-blur-xl
            border-l border-white/10
            text-white p-6 overflow-y-auto
          '
        >
          {/* Header */}
          <div className='flex items-start justify-between'>
            <h2 className='text-xl font-semibold tracking-tight'>
              CampusTV Studio
            </h2>

            {/* Desktop: X schließt komplett (onClose)
                Mobile: X klappt nur ein (damit du im 360 Modus bleibst)
            */}
            <button
              onClick={() => {
                if (window.innerWidth < 640) {
                  setCollapsedMobile(true);
                } else {
                  onClose();
                }
              }}
              className='text-white/60 hover:text-white transition'
            >
              <X size={18} />
            </button>
          </div>

          {/* Beschreibung */}
          <div className='mt-5 space-y-4 text-sm leading-relaxed text-white/80'>
            <p>
              Das CampusTV Studio produziert hochwertige Videobeiträge für
              Lehre, Forschung und Hochschulkommunikation – von Lehrfilmen und
              Seminarmodulen über Projektpräsentationen bis hin zu Interviews,
              Diskussionen und audiovisuellen Forschungsberichten.
            </p>

            <p>
              Neben Studioaufnahmen realisiert das Team regelmäßig Produktionen
              direkt auf dem Campus, z.B. in Laboren sowie im Kontext von
              Forschungs- und Kooperationsprojekten.
            </p>
          </div>

          {/* Bilder */}
          <div className='mt-6 grid grid-cols-2 gap-3'>
            {[
              '/Studio1.png',
              '/Studio2.png',
              '/Studio3.png',
              '/Studio4.jpg',
            ].map((src, i) => (
              <div
                key={i}
                className='relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5'
              >
                <Image
                  src={src}
                  alt={`CampusTV Studio ${i + 1}`}
                  fill
                  sizes='(max-width: 640px) 85vw, (max-width: 1200px) 33vw, 520px'
                  className='object-cover'
                />
              </div>
            ))}
          </div>

          {/* Link */}
          <div className='mt-6'>
            <a
              href='https://projekt.bht-berlin.de/lehrfilmstudio'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white/80 transition'
            >
              Zur offiziellen Webseite →
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
