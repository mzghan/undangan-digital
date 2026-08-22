// frontend/src/pages/demo/BohoSavana/sections/Cover.tsx
import { mempelai, tamuDefault, foto } from "../data";

function Cover({ onBuka }: { onBuka: () => void }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#f0e4d0] text-[#3d2e1f] px-6 py-14">
      {/* Dekor titik-titik samar */}
      <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(#6b4230_1px,transparent_1px)] [background-size:18px_18px]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="tracking-[0.35em] text-[10px] sm:text-xs uppercase text-[#b5654a] mb-6">
          ✦ The Wedding Of ✦
        </p>

        {/* Bingkai lengkung ala gapura, foto di dalamnya */}
        <div className="relative w-56 sm:w-64 lg:w-72 aspect-[4/5] rounded-t-[9999px] rounded-b-3xl overflow-hidden bg-gradient-to-b from-[#ddb98a] via-[#b5654a] to-[#6b4230] shadow-xl shadow-[#6b4230]/20 mb-8 border-4 border-white">
          <img src={foto.cover} alt={`${mempelai.pria.panggilan} & ${mempelai.wanita.panggilan}`} className="absolute inset-0 w-full h-full object-cover" />
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl leading-tight mb-1">
          {mempelai.pria.panggilan}
        </h1>
        <span className="text-xl italic text-[#b5654a] my-1">&</span>
        <h1 className="font-heading text-4xl sm:text-5xl leading-tight mb-8">
          {mempelai.wanita.panggilan}
        </h1>

        <div className="bg-white/60 border border-[#b5654a]/20 rounded-[2rem] px-6 py-4 mb-8 w-full max-w-xs">
          <p className="text-[11px] uppercase tracking-widest text-[#b5654a]/80 mb-1">
            Kepada Yth.
          </p>
          <p className="text-base">{tamuDefault}</p>
        </div>

        <button
          onClick={onBuka}
          className="bg-[#b5654a] text-white rounded-full px-9 py-3.5 text-sm font-medium tracking-wide shadow-lg shadow-[#b5654a]/30 hover:scale-105 active:scale-95 transition-transform"
        >
          Buka Undangan 🌿
        </button>
      </div>
    </div>
  );
}

export default Cover;
