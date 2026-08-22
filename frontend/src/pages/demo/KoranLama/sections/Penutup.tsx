// frontend/src/pages/demo/KoranLama/sections/Penutup.tsx
import { mempelai } from "../data";
import { motion } from "framer-motion";

function Penutup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }} className="min-h-screen bg-[#f4ecd8] text-[#2b2620] font-serif flex flex-col items-center justify-center px-6 py-20 pb-28 text-center">
      <div className="w-16 h-[2px] bg-[#2b2620] mb-8" />

      <p className="max-w-md text-sm leading-relaxed mb-8 italic text-justify">
        "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
        pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa
        tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan
        sayang."
      </p>
      <p className="text-xs tracking-[0.2em] uppercase mb-16">
        QS. Ar-Rum: 21
      </p>

      <p className="text-sm mb-2">Merupakan suatu kehormatan</p>
      <p className="text-sm mb-10">
        bagi kami sekeluarga, atas kehadiran dan doa restu Anda.
      </p>

      <h2 className="font-black text-3xl mb-2 uppercase">
        {mempelai.pria.panggilan} &amp; {mempelai.wanita.panggilan}
      </h2>

      <div className="mt-16 pt-6 border-t-4 border-double border-[#2b2620] text-[10px] tracking-widest uppercase">
        Warta Pawiwahan — Edisi Terakhir · Tamat
      </div>
    </motion.div>
  );
}

export default Penutup;
