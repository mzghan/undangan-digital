// frontend/src/pages/demo/Netflix/sections/Penutup.tsx
import { mempelai } from "../data";

function Penutup() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20 pb-28 text-center">
      <p className="text-[#E50914] font-black text-xl tracking-tight mb-8">
        N<span className="text-white">WEDDING</span>
      </p>

      <p className="max-w-md text-sm leading-relaxed text-[#d2d2d2] mb-8 italic">
        "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
        pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa
        tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan
        sayang."
      </p>
      <p className="text-xs tracking-[0.2em] uppercase text-[#a3a3a3] mb-16">
        QS. Ar-Rum: 21
      </p>

      <p className="text-sm text-[#a3a3a3] mb-2">Merupakan suatu kehormatan</p>
      <p className="text-sm text-[#a3a3a3] mb-10">
        bagi kami sekeluarga, atas kehadiran dan doa restu Anda.
      </p>

      <h2 className="font-black text-3xl mb-2 uppercase tracking-tight">
        {mempelai.pria.panggilan} & {mempelai.wanita.panggilan}
      </h2>

      <div className="mt-16 pt-6 border-t border-[#2a2a2a] text-[10px] tracking-widest uppercase text-[#a3a3a3]">
        Undangan Digital — Netflix Edition · Tayang Selamanya
      </div>
    </div>
  );
}

export default Penutup;
