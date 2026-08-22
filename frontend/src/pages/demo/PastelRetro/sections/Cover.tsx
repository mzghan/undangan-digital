// frontend/src/pages/demo/PastelRetro/sections/Cover.tsx
import { mempelai, tamuDefault } from "../data";

function Cover({ onBuka }: { onBuka: () => void }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#ffd9b3] text-[#2b1b12] px-6 py-14">
      {/* Blok diagonal ala poster retro */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#d17a9e] via-transparent to-transparent opacity-70" />
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#b06a8c] opacity-40" />
      <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-[#ffd9b3] border-[6px] border-[#2b1b12]/10" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="bg-[#2b1b12] text-[#ffd9b3] text-[10px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full rotate-[-3deg] mb-8 shadow-[3px_3px_0_#00000030]">
          Getting Married!
        </span>

        <div className="bg-white border-[3px] border-[#2b1b12] rounded-[1.75rem] px-8 py-10 shadow-[6px_6px_0_#2b1b12] rotate-1 max-w-xs">
          <h1 className="font-heading text-4xl sm:text-5xl leading-tight mb-1 text-[#a8577c]">
            {mempelai.pria.panggilan}
          </h1>
          <span className="text-xl text-[#2b1b12] my-1 inline-block">+</span>
          <h1 className="font-heading text-4xl sm:text-5xl leading-tight mb-6 text-[#a8577c]">
            {mempelai.wanita.panggilan}
          </h1>

          <p className="text-[10px] uppercase tracking-widest text-[#2b1b12]/60 mb-1">
            Kepada Yth.
          </p>
          <p className="text-base mb-6">{tamuDefault}</p>

          <button
            onClick={onBuka}
            className="bg-[#a8577c] text-white border-[3px] border-[#2b1b12] rounded-full px-7 py-2.5 text-sm font-medium tracking-wide shadow-[3px_3px_0_#2b1b12] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            Buka Undangan ✨
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cover;
