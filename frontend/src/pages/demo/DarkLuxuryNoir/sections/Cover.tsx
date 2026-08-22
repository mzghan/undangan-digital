// frontend/src/pages/demo/DarkLuxuryNoir/sections/Cover.tsx
import { mempelai, tamuDefault } from "../data";

function Cover({ onBuka }: { onBuka: () => void }) {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-black text-[#f0ede6]">
      {/* Panel foto — editorial, sisi kiri / atas */}
      <div className="relative w-full sm:w-1/2 h-[42vh] sm:h-screen overflow-hidden">
        {/* Ganti div ini dengan <img src="..." className="absolute inset-0 w-full h-full object-cover grayscale" /> kalau sudah ada foto */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] via-[#3a3a3a] to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        <div className="absolute left-6 top-6 sm:left-10 sm:top-10 text-[10px] tracking-[0.35em] uppercase text-[#d4af6a]">
          Est. 2027
        </div>
      </div>

      {/* Panel teks — sisi kanan / bawah */}
      <div className="relative w-full sm:w-1/2 flex-1 flex flex-col justify-center px-8 sm:px-14 py-14 sm:py-0">
        <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#d4af6a] mb-6">
          The Wedding Celebration
        </p>

        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-1">
          {mempelai.pria.panggilan}
        </h1>
        <div className="flex items-center gap-3 my-2">
          <span className="w-8 h-px bg-[#d4af6a]" />
          <span className="text-lg italic text-[#d4af6a]">and</span>
          <span className="w-8 h-px bg-[#d4af6a]" />
        </div>
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-10">
          {mempelai.wanita.panggilan}
        </h1>

        <div className="border-l border-[#d4af6a]/50 pl-4 mb-10 max-w-xs">
          <p className="text-[10px] uppercase tracking-widest text-[#d4af6a]/80 mb-1">
            Kepada Yth.
          </p>
          <p className="text-base">{tamuDefault}</p>
        </div>

        <button
          onClick={onBuka}
          className="group self-start flex items-center gap-4 text-sm tracking-[0.3em] uppercase text-[#f0ede6]"
        >
          Buka Undangan
          <span className="w-10 h-px bg-[#d4af6a] group-hover:w-16 transition-all duration-300" />
        </button>
      </div>
    </div>
  );
}

export default Cover;
