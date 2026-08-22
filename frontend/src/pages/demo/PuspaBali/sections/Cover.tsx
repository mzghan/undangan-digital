// frontend/src/pages/demo/PuspaBali/sections/Cover.tsx
import { mempelai, tamuDefault, foto } from "../data";

function Cover({ onBuka }: { onBuka: () => void }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#5c1f1f] via-[#3d1414] to-[#2a0e0e] text-[#e3c878] px-6 py-14">
      {/* Bingkai ornamen sudut emas */}
      <div className="absolute inset-4 sm:inset-8 border-2 border-[#c9a24b]/60 pointer-events-none">
        <span className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#e3c878]" />
        <span className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#e3c878]" />
        <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#e3c878]" />
        <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#e3c878]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="tracking-[0.4em] text-[10px] sm:text-xs uppercase text-[#c9a24b] mb-6">
          Undangan Pernikahan
        </p>

        {/* Foto heksagon — motif gapura Bali */}
        <div
          className="w-40 h-44 bg-gradient-to-b from-[#e3c878] via-[#c9a24b] to-[#5c1f1f] mb-8 border-2 border-[#e3c878]/70"
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        >
          <img src={foto.cover} alt={`${mempelai.pria.panggilan} & ${mempelai.wanita.panggilan}`} className="w-full h-full object-cover" style={{ clipPath: "inherit" }} />
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl leading-tight mb-1 text-[#f5e6c8]">
          {mempelai.pria.panggilan}
        </h1>
        <span className="text-lg italic text-[#c9a24b] my-1">&amp;</span>
        <h1 className="font-heading text-4xl sm:text-5xl leading-tight mb-8 text-[#f5e6c8]">
          {mempelai.wanita.panggilan}
        </h1>

        <div className="border border-[#c9a24b]/50 px-6 py-4 mb-8 w-full max-w-xs">
          <p className="text-[11px] uppercase tracking-widest text-[#c9a24b] mb-1">
            Kepada Yth.
          </p>
          <p className="text-base text-[#f5e6c8]">{tamuDefault}</p>
        </div>

        <button
          onClick={onBuka}
          className="bg-[#c9a24b] text-[#2a0e0e] rounded-full px-9 py-3.5 text-sm font-semibold tracking-widest uppercase shadow-lg shadow-black/30 hover:scale-105 active:scale-95 transition-transform"
        >
          Buka Undangan
        </button>
      </div>
    </div>
  );
}

export default Cover;
