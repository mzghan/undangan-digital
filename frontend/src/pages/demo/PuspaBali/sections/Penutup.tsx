// frontend/src/pages/demo/PuspaBali/sections/Penutup.tsx
import { mempelai } from "../data";
import { motion } from "framer-motion";

function Penutup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }} className="min-h-screen bg-gradient-to-b from-[#c9a24b] to-[#5c1f1f] text-white flex flex-col items-center justify-center px-6 py-20 pb-28 text-center">
      <p className="max-w-md text-sm leading-relaxed text-white/85 mb-8 italic">
        "Om Swastyastu. Di bawah restu Ida Sang Hyang Widhi Wasa, dua insan
        bersatu dalam ikatan cinta, bhakti, dan kasih yang abadi."
      </p>
      <p className="text-xs tracking-[0.2em] uppercase text-white/60 mb-16">
        Puja Restu Leluhur
      </p>

      <p className="text-sm text-white/80 mb-2">Merupakan suatu kehormatan</p>
      <p className="text-sm text-white/80 mb-10">
        bagi kami sekeluarga, atas kehadiran dan doa restu Anda.
      </p>

      <h2 className="font-heading text-3xl mb-2">
        {mempelai.pria.panggilan} & {mempelai.wanita.panggilan}
      </h2>

      <div className="mt-16 pt-6 border-t border-white/20 text-[10px] tracking-widest uppercase text-white/60">
        Undangan Digital — Puspa Bali
      </div>
    </motion.div>
  );
}

export default Penutup;
