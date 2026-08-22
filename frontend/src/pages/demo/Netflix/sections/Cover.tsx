// frontend/src/pages/demo/Netflix/sections/Cover.tsx
import { mempelai, tamuDefault, genreTags } from "../data";

function Cover({ onBuka }: { onBuka: () => void }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white px-6">
      {/* Vignette ala poster streaming */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(229,9,20,0.18),_transparent_60%)]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        <p className="text-[#E50914] font-black text-2xl tracking-tight mb-6">
          N<span className="text-white">WEDDING</span>
        </p>

        <p className="tracking-[0.35em] text-[10px] sm:text-xs uppercase text-[#a3a3a3] mb-4">
          A Netflix Wedding Original
        </p>

        <h1 className="font-black uppercase text-5xl sm:text-6xl leading-[0.95] tracking-tight mb-1">
          {mempelai.pria.panggilan}
        </h1>
        <span className="text-xl italic text-[#E50914] my-1">&</span>
        <h1 className="font-black uppercase text-5xl sm:text-6xl leading-[0.95] tracking-tight mb-6">
          {mempelai.wanita.panggilan}
        </h1>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {genreTags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wide border border-[#3a3a3a] rounded px-2.5 py-1 text-[#d2d2d2]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="bg-[#181818] border border-[#2a2a2a] rounded-lg px-6 py-4 mb-8 w-full max-w-xs">
          <p className="text-[11px] uppercase tracking-widest text-[#a3a3a3] mb-1">
            Kepada Yth.
          </p>
          <p className="text-base">{tamuDefault}</p>
        </div>

        <button
          onClick={onBuka}
          className="flex items-center gap-2 bg-[#E50914] text-white rounded px-9 py-3.5 text-sm font-bold tracking-wide shadow-lg shadow-[#E50914]/30 hover:bg-[#f6121d] active:scale-95 transition-all"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <polygon points="6,4 20,12 6,20" />
          </svg>
          Putar Undangan
        </button>
      </div>
    </div>
  );
}

export default Cover;
