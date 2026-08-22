// frontend/src/pages/demo/DarkLuxuryNoir/sections/Penutup.tsx
import { mempelai } from "../data";

function Penutup() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d4af6a] to-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 py-20 pb-28 text-center">
      <p className="max-w-md text-sm leading-relaxed text-white/85 mb-8 italic">
        "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
        pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa
        tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan
        sayang."
      </p>
      <p className="text-xs tracking-[0.2em] uppercase text-white/60 mb-16">
        QS. Ar-Rum: 21
      </p>

      <p className="text-sm text-white/80 mb-2">Merupakan suatu kehormatan</p>
      <p className="text-sm text-white/80 mb-10">
        bagi kami sekeluarga, atas kehadiran dan doa restu Anda.
      </p>

      <h2 className="font-heading text-3xl mb-2">
        {mempelai.pria.panggilan} & {mempelai.wanita.panggilan}
      </h2>

      <div className="mt-16 pt-6 border-t border-white/20 text-[10px] tracking-widest uppercase text-white/60">
        Undangan Digital — Dark Luxury Noir
      </div>
    </div>
  );
}

export default Penutup;
