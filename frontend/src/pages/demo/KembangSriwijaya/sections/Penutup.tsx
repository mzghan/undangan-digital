// frontend/src/pages/demo/KembangSriwijaya/sections/Penutup.tsx
import { mempelai } from "../data";

function Penutup() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2b1b12] via-[#3d2817] to-[#2b1b12] text-[#f5e9d6] flex flex-col items-center justify-center px-6 py-20 text-center">
      <p className="max-w-md text-sm leading-relaxed text-[#d9b98a] mb-10 italic">
        "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
        pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram
        kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."
      </p>
      <p className="text-xs tracking-[0.2em] uppercase text-[#c9a876] mb-16">
        QS. Ar-Rum: 21
      </p>

      <p className="text-sm text-[#c9a876] mb-2">Merupakan suatu kehormatan</p>
      <p className="text-sm text-[#c9a876] mb-10">
        bagi kami sekeluarga, atas kehadiran dan doa restu Anda.
      </p>

      <h2 className="font-serif text-3xl mb-2">
        {mempelai.pria.panggilan} & {mempelai.wanita.panggilan}
      </h2>

      <div className="mt-16 pt-6 border-t border-[#5c4a3a] text-[10px] tracking-widest uppercase text-[#8a5a2b]">
        Undangan Digital — Kembang Sriwijaya
      </div>
    </div>
  );
}

export default Penutup;
