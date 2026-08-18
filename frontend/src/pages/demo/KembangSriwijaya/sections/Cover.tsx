// frontend/src/pages/demo/KembangSriwijaya/sections/Cover.tsx
import { useState } from "react";
import { mempelai, tamuDefault } from "../data";

function Cover({ onBuka }: { onBuka: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-[#2b1b12] via-[#3d2817] to-[#2b1b12] text-[#f5e9d6]">
      <p className="tracking-[0.3em] text-xs uppercase text-[#d9b98a] mb-6">
        The Wedding Of
      </p>

      <h1 className="font-serif text-4xl md:text-6xl mb-2">
        {mempelai.pria.panggilan}
      </h1>
      <span className="text-2xl md:text-3xl italic text-[#d9b98a] my-2">&</span>
      <h1 className="font-serif text-4xl md:text-6xl mb-8">
        {mempelai.wanita.panggilan}
      </h1>

      <div className="text-sm text-[#d9b98a] mb-2">Kepada Yth.</div>
      <div className="text-lg mb-10">{tamuDefault}</div>

      <button
        onClick={onBuka}
        className="border border-[#d9b98a] rounded-full px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#d9b98a] hover:text-[#2b1b12] transition-colors"
      >
        Buka Undangan
      </button>
    </div>
  );
}

export default Cover;
