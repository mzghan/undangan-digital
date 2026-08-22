// frontend/src/pages/demo/FloralBlanc/sections/Cover.tsx
import { mempelai, tamuDefault } from "../data";

function Cover({ onBuka }: { onBuka: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf6f0] text-[#5c4a45] px-6 py-16">
      {/* Bingkai garis tipis ganda ala undangan cetak klasik */}
      <div className="relative w-full max-w-sm border border-[#c9a06e]/50 p-1">
        <div className="border border-[#c9a06e]/30 px-8 py-12 flex flex-col items-center text-center">
          <p className="font-script text-2xl text-[#c9a06e] mb-6">Undangan Pernikahan</p>

          {/* Foto oval kecil di atas */}
          <div className="w-28 h-36 rounded-[50%] overflow-hidden bg-gradient-to-b from-[#e8c9c9] via-[#c9a06e] to-[#9c6b6b] mb-8 border border-[#c9a06e]/40">
            {/* Ganti div ini dengan <img src="..." className="w-full h-full object-cover" /> kalau sudah ada foto */}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl mb-3 uppercase">
            {mempelai.pria.panggilan}
          </h1>
          <span className="font-script text-lg text-[#c9a06e] italic mb-3">&amp;</span>
          <h1 className="font-heading text-3xl sm:text-4xl mb-8 uppercase">
            {mempelai.wanita.panggilan}
          </h1>

          <div className="w-10 h-px bg-[#c9a06e] mb-8" />

          <p className="text-[11px] uppercase tracking-widest text-[#a8794a] mb-1">
            Kepada Yth.
          </p>
          <p className="text-base mb-8">{tamuDefault}</p>

          <button
            onClick={onBuka}
            className="border border-[#a8794a] text-[#a8794a] px-8 py-2.5 text-xs uppercase tracking-[0.25em] hover:bg-[#a8794a] hover:text-white transition-colors"
          >
            Buka Undangan
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cover;
