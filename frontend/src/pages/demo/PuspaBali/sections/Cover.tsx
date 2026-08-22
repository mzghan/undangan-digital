// frontend/src/pages/demo/PuspaBali/sections/Cover.tsx
import { mempelai, tamuDefault } from "../data";

function Cover({ onBuka }: { onBuka: () => void }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden bg-gradient-to-br from-[#e3c878] via-[#c9a24b] to-[#5c1f1f]">
      {/* Ganti div ini dengan <img src="..." className="absolute inset-0 w-full h-full object-cover" /> kalau sudah ada foto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 pb-16 sm:pb-20 text-white">
        <p className="tracking-[0.35em] text-[10px] sm:text-xs uppercase text-white/80 mb-4">
          Undangan Pernikahan
        </p>

        <h1 className="font-heading text-5xl sm:text-6xl leading-tight mb-1">
          {mempelai.pria.panggilan}
        </h1>
        <span className="text-xl italic text-white/80 my-1">&</span>
        <h1 className="font-heading text-5xl sm:text-6xl leading-tight mb-8">
          {mempelai.wanita.panggilan}
        </h1>

        <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-6 py-4 mb-8 w-full max-w-xs">
          <p className="text-[11px] uppercase tracking-widest text-white/70 mb-1">
            Kepada Yth.
          </p>
          <p className="text-base">{tamuDefault}</p>
        </div>

        <button
          onClick={onBuka}
          className="bg-white text-[#a17c2f] rounded-full px-9 py-3.5 text-sm font-medium tracking-wide shadow-lg shadow-black/20 hover:scale-105 active:scale-95 transition-transform"
        >
          Buka Undangan
        </button>
      </div>
    </div>
  );
}

export default Cover;
