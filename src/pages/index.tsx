import React from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

// Schrift einbinden
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plus-jakarta",
});

export default function Home() {
  return (
    <main
      className={`${plusJakarta.className} min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-6 py-12`}
    >
      <div className='max-w-3xl w-full space-y-8 text-center'>
        {/* Titel */}
        <h1 className='text-4xl font-bold tracking-tight'>Haus Bauwesen</h1>

        {/* Beschreibung */}
        <p className='text-lg leading-relaxed text-neutral-300'>
          In dem Gebäude sind Hörsäle, Lehr- und Büroräume, das Labor für das
          Projekt
          <span className='italic text-indigo-400'>
            {" "}
            „Zukunft Stadt – Innovative Hochschule“
          </span>{" "}
          des Referats Technologietransfer sowie u. a. die Fachbereiche III und
          IV, die Bibliothek, das Hochschulrechenzentrum, das
          Fernstudieninstitut (FSI), der AStA sowie die Mensa untergebracht.
        </p>

        {/* Lernräume */}
        <div className='border-t border-neutral-700 pt-6'>
          <h2 className='text-2xl font-semibold mb-3'>Lernräume</h2>
          <p className='text-lg text-neutral-300'>
            Raum D 115, Lernbereich im EG der Mensa
          </p>
        </div>
      </div>
    </main>
  );
}
