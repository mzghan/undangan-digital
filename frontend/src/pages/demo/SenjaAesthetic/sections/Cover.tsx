// frontend/src/pages/demo/SenjaAesthetic/sections/Cover.tsx
import { mempelai, tamuDefault } from "../data";

function Cover({ onBuka }: { onBuka: () => void }) {
  return (
    <div className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-gradient-to-br from-[#f2c19a] via-[#c17b5f] to-[#5a3a2e]">
      {/* Ganti div ini dengan <img src="..." className="absolute inset-0 w-full h-full object-cover" /> kalau sudah ada foto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="relative z-10 flex flex-col items-start text-left px-8 sm:px-14 pb-16 sm:pb-20 max-w-lg text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-white/80 mb-3">
          Sabtu, {mempelai.pria.panggilan} &amp; {mempelai.wanita.panggilan}
        </p>

        <h1 className="font-heading text-5xl sm:text-6xl leading-[1.05] mb-6">
          {mempelai.pria.panggilan} <span className="italic font-normal">&amp;</span> {mempelai.wanita.panggilan}
        </h1>

        <div className="w-14 h-[3px] bg-white mb-6" />

        <div className="mb-8">
          <p className="text-[11px] uppercase tracking-widest text-white/70 mb-1">
            Kepada Yth.
          </p>
          <p className="text-base">{tamuDefault}</p>
        </div>

        <button
          onClick={onBuka}
          className="bg-white text-[#a05a45] rounded-xl px-8 py-3 text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors"
        >
          Buka Undangan →
        </button>
      </div>
    </div>
  );
}

export default Cover;
